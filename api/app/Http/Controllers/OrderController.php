<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
class OrderController {
 private function mobile():bool{return env('APP_VARIANT')==='mobile';}
 private function formatted(object $order):array {
  $items=DB::table('order_items')->where('order_id',$order->id)->get();
  if (!$this->mobile())return ['id'=>$order->id,'user_id'=>$order->user_id,'total_kobo'=>$order->total_kobo,'status'=>$order->status,'currency'=>$order->currency,'created_at'=>$order->created_at,'items'=>$items];
  return ['id'=>$order->id,'status'=>$order->status,'totalKobo'=>$order->total_kobo,'createdAt'=>$order->created_at,'items'=>$items->map(fn($v)=>['productId'=>$v->product_id,'name'=>$v->product_name,'quantity'=>$v->quantity,'unitPriceKobo'=>$v->unit_price_kobo])->all()];
 }
 public function index(Request $request) {
  $uid=$request->attributes->get('training_user_id');
  $query=DB::table('orders')->orderByDesc('id');
  $user=DB::table('users')->where('id',$uid)->first();
  if (!$user || $user->role!=='admin')$query->where('user_id',$uid);
  $list=$query->get()->map(fn($row)=>$this->formatted($row))->all();
  return response()->json($this->mobile()?$list:['data'=>$list,'count'=>count($list)]);
 }
 public function show(Request $request,int $id) {
  $o=DB::table('orders')->where('id',$id)->where('user_id',$request->attributes->get('training_user_id'))->first();
  if (!$o)return response()->json(['message'=>'Order not found'],404);
  return response()->json($this->mobile()?$this->formatted($o):['data'=>$this->formatted($o)]);
 }
 public function store(Request $request) {
  $data=$request->validate(['items'=>'required|array|min:1|max:30','items.*.quantity'=>'required|integer|min:1|max:100']);
  $lines=$data['items'];
  $clean=[];
  foreach($lines as $line){
   $id=$line['productId']??$line['product_id']??null;
   if (!is_numeric($id)||((int)$id)<1)throw ValidationException::withMessages(['items'=>'Every line needs a valid productId or product_id']);
   if (isset($clean[(int)$id]))throw ValidationException::withMessages(['items'=>'Duplicate products are not permitted']);
   $clean[(int)$id]=(int)$line['quantity'];
  }
  try {
   $created=DB::transaction(function()use($request,$clean){
    $subtotal=0;$items=[];
    foreach($clean as $id=>$quantity){
     $p=DB::table('products')->where('id',$id)->where('active',true)->lockForUpdate()->first();
     if (!$p||$p->stock<$quantity)throw new \DomainException('Product missing or not enough stock');
     $subtotal += $p->price_kobo*$quantity;
     $items[]=[$p,$quantity];
    }
    $id=DB::table('orders')->insertGetId(['user_id'=>$request->attributes->get('training_user_id'),'status'=>'pending','total_kobo'=>$subtotal,'currency'=>'NGN','created_at'=>now(),'updated_at'=>now()]);
    foreach($items as [$p,$qty]){
     $changed=DB::table('products')->where('id',$p->id)->where('stock','>=',$qty)->decrement('stock',$qty);
     if ($changed!==1)throw new \DomainException('Stock changed before checkout completed');
     DB::table('order_items')->insert(['order_id'=>$id,'product_id'=>$p->id,'product_name'=>$p->name,'quantity'=>$qty,'unit_price_kobo'=>$p->price_kobo,'line_total_kobo'=>$p->price_kobo*$qty]);
    }
    return DB::table('orders')->where('id',$id)->first();
   },3);
   return response()->json($this->mobile()?$this->formatted($created):['data'=>$this->formatted($created)],201);
  }catch(\DomainException $e){return response()->json(['message'=>$e->getMessage(),'error'=>['code'=>'checkout_conflict','message'=>$e->getMessage()]],409);}
 }
 public function update(Request $request,int $id){
  $user=DB::table('users')->where('id',$request->attributes->get('training_user_id'))->first();
  if ($user->role!=='admin')return response()->json(['message'=>'Forbidden'],403);
  $data=$request->validate(['status'=>'required|in:pending,paid,shipped,cancelled']);
  $changed=DB::table('orders')->where('id',$id)->update(['status'=>$data['status'],'updated_at'=>now()]);
  return $changed?response()->json(['status'=>$data['status']]):response()->json(['message'=>'Not found'],404);
 }
}

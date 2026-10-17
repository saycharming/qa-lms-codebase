<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ProductController {
 private function mobile():bool{return env('APP_VARIANT')==='mobile';}
 private function product(object $r):array {
  $o=(array)$r;
  if (!$this->mobile()) return $o;
  return ['id'=>$r->id,'name'=>$r->name,'slug'=>$r->slug,'description'=>$r->description,'priceKobo'=>$r->price_kobo,'stock'=>$r->stock,'imageUrl'=>$r->image];
 }
 public function index(Request $request) {
  $q=DB::table('products')->where('active',true);
  if ($request->filled('search')) $q->where(fn($query)=>$query->where('name','like','%'.$request->query('search').'%')->orWhere('description','like','%'.$request->query('search').'%'));
  if ($request->filled('category')) $q->where('category',$request->query('category'));
  $sort=$request->query('sort','name');
  [$col,$dir]=match($sort){'price-asc'=>['price_kobo','asc'],'price-desc'=>['price_kobo','desc'],'newest'=>['created_at','desc'],default=>['name','asc']};
  $list=$q->orderBy($col,$dir)->get()->map(fn($x)=>$this->product($x))->all();
  return response()->json($this->mobile()?$list:['data'=>$list,'count'=>count($list)]);
 }
 public function show(int $id) {
  $row=DB::table('products')->where('active',true)->where('id',$id)->first();
  if (!$row) return response()->json(['message'=>'Product not found','error'=>['code'=>'not_found','message'=>'Product not found']],404);
  return response()->json($this->mobile()?$this->product($row):['data'=>$this->product($row)]);
 }
}

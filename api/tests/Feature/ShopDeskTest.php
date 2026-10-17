<?php
namespace Tests\Feature;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
class ShopDeskTest extends TestCase {
 use RefreshDatabase;
 public function test_health():void{$this->getJson('/api/health')->assertOk()->assertJsonPath('status','ok');}
 public function test_products_seeded():void{$this->seed();$this->getJson('/api/products')->assertOk();}
 public function test_checkout_rejects_unauthorised_request():void{$this->postJson('/api/orders',['items'=>[]])->assertUnauthorized();}
 public function test_registration_and_checkout_update_stock():void {
  $this->seed();
  $token=$this->postJson('/api/auth/register',['name'=>'Ada Student','email'=>'ada@example.test','password'=>'securePass123'])->assertCreated()->json('token');
  $id=DB::table('products')->first()->id; $initial=DB::table('products')->where('id',$id)->value('stock');
  $this->withToken($token)->postJson('/api/orders',['items'=>[['productId'=>$id,'quantity'=>2]]])->assertCreated();
  $this->assertSame($initial-2,DB::table('products')->where('id',$id)->value('stock'));
 }
}

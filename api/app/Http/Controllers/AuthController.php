<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class AuthController {
 public function register(Request $request) {
  $data=$request->validate(['name'=>'required|string|min:2|max:120','email'=>'required|email|max:160|unique:users,email','password'=>'required|string|min:8']);
  $id=DB::table('users')->insertGetId(['name'=>$data['name'],'email'=>strtolower($data['email']),'password'=>Hash::make($data['password']),'role'=>'customer','created_at'=>now(),'updated_at'=>now()]);
  $user=DB::table('users')->where('id',$id)->first();
  return response()->json(['user'=>$this->safe($user),'token'=>$this->token($id)],201);
 }
 public function login(Request $request) {
  $data=$request->validate(['email'=>'required|email','password'=>'required|string']);
  $user=DB::table('users')->where('email',strtolower($data['email']))->first();
  if (!$user || !Hash::check($data['password'],$user->password)) return response()->json(['message'=>'Invalid credentials','error'=>['code'=>'invalid_credentials','message'=>'Invalid credentials']],401);
  return response()->json(['user'=>$this->safe($user),'token'=>$this->token((int)$user->id)]);
 }
 public function me(Request $request) {
  $user=DB::table('users')->where('id',$request->attributes->get('training_user_id'))->first();
  return response()->json(['user'=>$this->safe($user)]);
 }
 public function logout(Request $request) {
  DB::table('api_tokens')->where('token_hash',hash('sha256',$request->bearerToken()))->delete();
  return response()->json(['message'=>'Signed out']);
 }
 private function safe(object $user):array{return ['id'=>$user->id,'name'=>$user->name,'email'=>$user->email,'role'=>$user->role];}
 private function token(int $id):string {
  $token=Str::random(64);
  DB::table('api_tokens')->insert(['user_id'=>$id,'token_hash'=>hash('sha256',$token),'expires_at'=>now()->addHours(24),'created_at'=>now()]);
  return $token;
 }
}

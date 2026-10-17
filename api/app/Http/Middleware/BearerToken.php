<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
class BearerToken {
 public function handle(Request $request, Closure $next): Response {
  $token=$request->bearerToken();
  if (!$token) return response()->json(['message'=>'Authentication required','error'=>['code'=>'unauthorized','message'=>'Authentication required']],401);
  $row=DB::table('api_tokens')->where('token_hash',hash('sha256',$token))->where('expires_at','>',now())->first();
  if (!$row) return response()->json(['message'=>'Invalid or expired token','error'=>['code'=>'unauthorized','message'=>'Invalid or expired token']],401);
  $request->attributes->set('training_user_id',(int)$row->user_id);
  return $next($request);
 }
}

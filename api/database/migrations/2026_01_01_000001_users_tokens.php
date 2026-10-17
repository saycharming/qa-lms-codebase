<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
 public function up():void {
  Schema::create('users',function(Blueprint $t){$t->id();$t->string('name');$t->string('email')->unique();$t->string('password');$t->string('role')->default('customer');$t->timestamps();});
  Schema::create('api_tokens',function(Blueprint $t){$t->id();$t->foreignId('user_id')->constrained('users')->cascadeOnDelete();$t->string('token_hash',64)->unique();$t->timestamp('expires_at')->index();$t->timestamp('created_at');});
 }
 public function down():void {Schema::dropIfExists('api_tokens');Schema::dropIfExists('users');}
};

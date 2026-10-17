<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
 public function up():void {
  Schema::create('products',function(Blueprint $t){$t->id();$t->string('name');$t->string('slug')->unique();$t->text('description')->default('');$t->unsignedBigInteger('price_kobo');$t->string('currency')->default('NGN');$t->string('category')->default('home');$t->unsignedInteger('stock')->default(0);$t->boolean('active')->default(true);$t->string('image')->default('');$t->timestamps();});
  Schema::create('orders',function(Blueprint $t){$t->id();$t->foreignId('user_id')->constrained();$t->string('status')->default('pending');$t->unsignedBigInteger('total_kobo');$t->string('currency')->default('NGN');$t->timestamps();});
  Schema::create('order_items',function(Blueprint $t){$t->id();$t->foreignId('order_id')->constrained()->cascadeOnDelete();$t->foreignId('product_id')->constrained();$t->string('product_name');$t->unsignedInteger('quantity');$t->unsignedBigInteger('unit_price_kobo');$t->unsignedBigInteger('line_total_kobo');});
 }
 public function down():void {Schema::dropIfExists('order_items');Schema::dropIfExists('orders');Schema::dropIfExists('products');}
};

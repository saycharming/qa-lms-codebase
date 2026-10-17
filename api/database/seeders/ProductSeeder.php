<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductSeeder extends Seeder {
 public function run():void {
  $products=[
['Oak Writing Desk','oak-writing-desk','office',4500000,12],
['Ergonomic Office Chair','ergonomic-office-chair','office',8900000,7],
['USB-C 7-in-1 Hub','usb-c-7-in-1-hub','electronics',2500000,40],
['Wireless Mechanical Keyboard','wireless-mechanical-keyboard','electronics',3750000,25],
['27-inch 4K Monitor','27-inch-4k-monitor','electronics',18900000,9],
['Noise-Cancelling Headphones','noise-cancelling-headphones','electronics',12500000,18],
['Desk Lamp with Wireless Charger','desk-lamp-wireless-charger','home',1850000,30],
['A5 Hardcover Notebook','a5-hardcover-notebook','office',350000,100],
['Insulated Water Bottle','insulated-water-bottle','home',1200000,55],
['Portable Bluetooth Speaker','portable-bluetooth-speaker','electronics',6750000,22]
  ];
  foreach($products as [$name,$slug,$category,$price,$stock]){
   DB::table('products')->updateOrInsert(['slug'=>$slug],['name'=>$name,'description'=>$name,'category'=>$category,'price_kobo'=>$price,'stock'=>$stock,'currency'=>'NGN','active'=>true,'image'=>'','created_at'=>now(),'updated_at'=>now()]);
  }
 }
}

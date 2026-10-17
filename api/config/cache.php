<?php
return ['default'=>env('CACHE_STORE','file'),'stores'=>[
 'file'=>['driver'=>'file','path'=>storage_path('framework/cache/data')],
 'array'=>['driver'=>'array','serialize'=>false],
 'redis'=>['driver'=>'redis','connection'=>'cache']], 'prefix'=>'pintop_training_'];

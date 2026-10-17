<?php
return ['name'=>env('APP_NAME','Pintop Training'), 'env'=>env('APP_ENV','local'),
 'debug'=>(bool)env('APP_DEBUG',false), 'url'=>env('APP_URL','http://localhost:8000'),
 'timezone'=>'Africa/Lagos','locale'=>'en','fallback_locale'=>'en','faker_locale'=>'en_NG',
 'key'=>env('APP_KEY'), 'cipher'=>'AES-256-CBC',
 'maintenance'=>['driver'=>'file']];

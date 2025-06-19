<?php

use Illuminate\Support\Facades\DB;

Route::get('/db-test', function () {
    try {
        DB::connection()->getPdo();
        return '✅ DB connection is OK';
    } catch (\Exception $e) {
        return '❌ DB connection failed: ' . $e->getMessage();
    }
});

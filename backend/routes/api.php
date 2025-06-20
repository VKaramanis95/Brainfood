<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\SocialAIPlanController;

Route::prefix('companies')->group(function () {
    Route::get('/', [CompanyController::class, 'index']);
    Route::post('/', [CompanyController::class, 'store']);
    Route::get('/{id}', [CompanyController::class, 'show']);
    Route::put('/{id}', [CompanyController::class, 'update']);
    Route::delete('/{id}', [CompanyController::class, 'destroy']);
});
Route::apiResource('socialaiplans', SocialAIPlanController::class);

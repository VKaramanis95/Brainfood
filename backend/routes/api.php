<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\SocialAIPlanController;
use App\Http\Controllers\CompanyPlanController;

Route::prefix('companies')->group(function () {
    Route::get('/', [CompanyController::class, 'index']);
    Route::post('/', [CompanyController::class, 'store']);
    Route::get('/{id}', [CompanyController::class, 'show']);
    Route::put('/{id}', [CompanyController::class, 'update']);
    Route::delete('/{id}', [CompanyController::class, 'destroy']);
});
Route::prefix('companyplans')->group(function () {
    Route::get('/', [CompanyPlanController::class, 'index']); // list all plans
    Route::get('/company/{id}', [CompanyPlanController::class, 'byCompany']); // history of plans for a company
    Route::get('/active/{id}', [CompanyPlanController::class, 'active']); // currently active plan for a company
    Route::post('/', [CompanyPlanController::class, 'store']); // assign plan to company
});
Route::apiResource('socialaiplans', SocialAIPlanController::class);

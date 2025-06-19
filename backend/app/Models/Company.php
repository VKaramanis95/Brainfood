<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'ms_company';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'Name', 'role', 'VAT', 'ERPcode', 'BillingDOY', 'BillingCompanyName',
        'BillingAddress1', 'BillingAddress2', 'BillingCity', 'BillingCountry',
        'BillingPhone', 'BillingBankAccount', 'RegistrationFee', 'FeeisInvoiced',
        'FeeInvoiceID', 'MotherCompanyID', 'shutterstock_apikey', 'shutterstock_token',
        'updated_at', 'created_at', 'shutterstock_subscriptionID', 'unsplash_apikey',
        'pixabay_apikey', 'pexels_apikey'
    ];

    public function motherCompany()
    {
        return $this->belongsTo(Company::class, 'MotherCompanyID');
    }
}

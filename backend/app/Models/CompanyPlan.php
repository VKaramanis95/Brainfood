<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyPlan extends Model
{
    protected $table = 'ms_socialaicommercialmodel';

    protected $fillable = [
        'companyID',
        'Name',
        'Description',
        'pricingPlanID',
        'start_date',
        'end_date',
        'isInvoiced',
        'InvoiceID',
        'price',
        'discount',
        'finalprice',
        'monthyear',
    ];


    public function company()
    {
        return $this->belongsTo(Company::class, 'companyID', 'ID');
    }
    public function plan()
    {
        return $this->belongsTo(SocialAIPlan::class, 'pricingPlanID');
    }

    public function getIsActiveAttribute()
    {
        $today = date('Y-m-d');
        return (!$this->end_date || $this->end_date >= $today) && $this->start_date <= $today;
    }
}

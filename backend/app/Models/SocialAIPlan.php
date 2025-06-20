<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialAIPlan extends Model
{
    protected $table = 'ms_socialaiplans';

    protected $primaryKey = 'ID';

    public $timestamps = false;

    protected $fillable = [
        'Name',
        'allowsocialaccounts',
        'allowpostspermonth',
        'allowswitchboardtemplates',
        'allowinstcarousels',
        'allowcreatomatevideospermonth',
        'allowxxx',
        'initialpricemonth',
        'initialpricediscount'
    ];
}


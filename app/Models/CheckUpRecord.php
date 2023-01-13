<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckUpRecord extends Model
{
    use HasFactory;

    public function picture()
    {
        return $this->hasOne(User::class, 'patient_id', 'patient_id');
    }

    public function info()
    {
        return $this->hasOne(PatientInformation::class, 'id', 'patient_id');
    }
    
    protected $casts = [
        'illness_id' => 'array',
        'medicine_given' => 'array',
    ];
}

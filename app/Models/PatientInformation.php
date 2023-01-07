<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientInformation extends Model
{
    use HasFactory;

    public function purok()
    {
        return $this->hasOne(Purok::class, 'id', 'purok_id');
    }

    public function healthRecord()
    {
        return $this->hasOne(HealthInformation::class, 'patient_id', 'id');
    }

    public function account()
    {
        return $this->hasOne(User::class, 'patient_id', 'id');
    }
}

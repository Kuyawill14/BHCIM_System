<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sms extends Model
{
    use HasFactory;

    public function information()
    {
        return $this->hasOne(PatientInformation::class, 'id', 'patient_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'sms_id', 'id');
    }
}

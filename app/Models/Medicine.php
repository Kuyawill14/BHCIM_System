<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;
    public function stocks()
    {
        return $this->hasMany(MedicineStock::class, 'medicine_id', 'id');
    }

    public function total_stocks()
    {
        return $this->hasOne(MedicineStock::class, 'medicine_id', 'id');
    }
}

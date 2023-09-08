<?php

namespace App\Models;
use TCG\Voyager\Traits\Translatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Yolcutipi extends Model
{
    use HasFactory;

    public function yolcu(){

        return $this->hasMany(Yolcu::class);
        }
}
<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use TCG\Voyager\Traits\Translatable;
use Illuminate\Database\Eloquent\Model;
use App\Models\Yolcutipi;
class Yolcu extends Model
{
    use HasFactory;
    protected $fillable = ['isim','soyisim','telefon','yolcu_tipi_id'];

    public function yolcu_tipi(){
        return $this->belongsTo(Yolcutipi::class, "yolcu_tipi_id");
    }
}
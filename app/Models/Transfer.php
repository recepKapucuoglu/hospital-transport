<?php

namespace App\Models;
use TCG\Voyager\Traits\Translatable;
use Illuminate\Database\Eloquent\Model;
use App\Models\Yolcu;
use App\Models\Arac;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transfer extends Model
{
    use HasFactory;
    protected $fillable = ['yolcu_id','arac_id','sefer_tarihi','sefer_saati','baslangic_noktasi','bitis_noktasi'];
    public function yolcu(){
        return $this->belongsTo(Yolcu::class, "yolcu_id");
    }
    public function arac(){
        return $this->belongsTo(Arac::class, "arac_id");
    }

}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;
    protected $table = "destinations";
    protected $primaryKey = "id";
    protected $fillable = [
        "city",
        "province",
        "airport_code",
        "airport_name",
        "country",
        "country_code"
    ];

    public function scopeCity($query,$city){
        if($city == "" || $city == null){
            return $query;
        }else{
            return $query->where("city","LIKE","%".$city."%");
        }
    }

    public function scopeAirport($query,$airport_name){
        if($airport_name == "" || $airport_name == null){
            return $query;
        }else{
            return $query->where("airport_name",$airport_name);
        }
    }
}

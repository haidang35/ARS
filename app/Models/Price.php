<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    use HasFactory;
    protected $table = "prices";
    protected $fillable = [
        "flight_id",
        "class",
        "price",

    ];

    public function Flight()
    {
        return $this->belongsTo(Flight::class);
    }
}

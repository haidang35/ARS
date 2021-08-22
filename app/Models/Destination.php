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
        "country_code",
        "favourite",
        "image"
    ];

    public function Flight()
    {
        return $this->hasMany(Flight::class);
    }

    public function Image()
    {
        return $this->hasMany(Image::class);
    }
}

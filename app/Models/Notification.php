<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $table = "notifications";
    protected $fillable = [
        "user_id",
        "title",
        "content",
        "read"
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}

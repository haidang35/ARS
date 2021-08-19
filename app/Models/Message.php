<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $table = "messages";
    protected $fillable = [
        "user_id",
        "message",
        "user_received"
    ];

    public function UserSending()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function UserReceived()
    {
        return $this->belongsTo(User::class, "user_received", "id");
    }
}

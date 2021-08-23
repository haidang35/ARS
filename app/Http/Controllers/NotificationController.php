<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use PHPUnit\Framework\Error\Notice;

class NotificationController extends Controller
{
    public function getNotificationList()
    {
        $notices = Notification::all();
        return $notices;
    }

    public function getNewNotification()
    {
        $newNotices = Notification::where("read", 0)->get();
        return $newNotices;
    }

    public function updateReadNotification()
    {
        $newNotices = Notification::where("read", 0)->get();
        foreach ($newNotices as $item) {
            $item->update([
                "read" => 1
            ]);
        };
        return $newNotices;
    }
}

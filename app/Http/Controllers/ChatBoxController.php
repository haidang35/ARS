<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;

class ChatBoxController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function fetchMessage()
    {
        $userId = auth()->user()->id;
        $messages = Message::with("UserSending")->with("UserReceived")->get();
        $matchMessages = [];
        foreach ($messages as $item) {
            if (
                $item["user_received"] == 1 && $item["user_id"] == $userId
                || ($item["user_id"] == 1 && $item["user_received"] == $userId)
            ) {
                $matchMessages[] = $item;
            }
        }
        return response()->json($matchMessages);
    }

    public function sendMessage(Request $request)
    {
        $message = Message::create([
            "user_id" => auth()->user()->id,
            "message" => $request->message,
            "user_received" => $request->user_received
        ]);

        broadcast(new MessageEvent($message->load("UserSending")))->toOthers();

        return response()->json($message);
    }

    public function getListPeopleChat()
    {
        $userId = auth()->user()->id;
        $listPeopleChat = User::where("roleId", 1)->whereNotIn("id", [$userId])->get();
        $messages = Message::where("user_received", $userId)->get();
        foreach ($messages as $item) {
            if ($item["user_received"] == $userId) {
                $userChat = User::find($item["user_id"]);
                $listPeopleChat[] = $userChat;
                break;
            }
        }
        return response()->json($listPeopleChat);
    }

    public function getIncomingMessage($userId)
    {
        $messages = Message::with("UserSending")->with("UserReceived")->get();
        $matchMessages = [];
        foreach ($messages as $item) {
            if (
                $item["user_received"] == $userId && $item["user_id"] == auth()->user()->id
                || ($item["user_id"] == $userId && $item["user_received"] == auth()->user()->id)
            ) {
                $matchMessages[] = $item;
            }
        }
        return response()->json($matchMessages);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Passport\Client;

class AuthController extends Controller
{
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|string|max:255',
            'password' => 'required|string|between:8,255',
        ]);

        if ($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

        $passwordGrantClient = Client::where('password_client', 1)
            ->first();
        $data = [
            'grant_type' => 'password',
            'client_id'  => $passwordGrantClient->id,
            'client_secret' => $passwordGrantClient->secret,
            'username' => $request->email,
            'password' => $request->password,
            'scope' => '*',
        ];

        $tokenRequest = Request::create('/oauth/token', 'post', $data);

        return app()->handle($tokenRequest);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|string|max:255|unique:users',
            'password' => 'required|string|between:8,255|confirmed',
        ]);

        if ($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        if (!$user){
            return response()->json([
                'success' => false,
                'message' => 'Registration error'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Registration succeeded'
        ], 500);

    }
}

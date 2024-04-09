<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function login(Request $request) {
        $response = Http::asForm()->post('http://127.0.0.1:8001/oauth/token', [
            'grant_type' => 'password',
            'client_id' =>  2,
            'client_secret' => 'AizQHyRVcvH0yOMgpQFxymbP4fQywXQFIqCprSQM',
            'username' => $request->email,
            'password' => $request->password,
            'scope' => '',
        ]);

        if ($response->status() == 200) {
            $refreshToken = $response->json()['refresh_token'];
            $refreshCookie = cookie('refresh_token', $refreshToken, 86400, '/', null, true, true, false, 'None');
            return response()->json(['token' => $response->json()['access_token']])->withCookie($refreshCookie);
        }
        if ($response->failed()) {
            return response()->json('Unauthorized', 401);
        }
    }

    public function user() {
        return auth()->user();
    }

    public function logout() {
        auth()->user()->tokens->each(function($token, $key) {
            $token->delete();
        });

        return response()->json('Logged out successfully', 200);
    }

    public function refresh(Request $request) {
        $refresh_token = $request->cookie('refresh_token');
        $response = Http::asForm()->post('http://127.0.0.1:8001/oauth/token', [
            'grant_type' => 'refresh_token',
            'refresh_token' => $refresh_token,
            'client_id' =>  2,
            'client_secret' => 'AizQHyRVcvH0yOMgpQFxymbP4fQywXQFIqCprSQM',
            'scope' => '',
        ]);

        if ($response->status() == 200) {
            $refreshToken = $response->json()['refresh_token'];
            $refreshCookie = cookie('refresh_token', $refreshToken, 86400, '/', null, true, true, false, 'None');
            return response()->json(['token' => $response->json()['access_token']])->withCookie($refreshCookie);
        }
        if ($response->failed()) {
            return response()->json('Unauthorized', 401);
        }
    }
}

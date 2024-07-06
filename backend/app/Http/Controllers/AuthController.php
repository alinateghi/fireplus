<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
	/**
	 * Logout.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
    public function getMe(Request $request)
	{
		$user = $request->user();
		$user->load("ownerable");
		return $user;
	}

	/**
	 * Login and return token.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
    public function login(Request $request)
	{
		$request->validate([
			'username' => 'required|string',
			'password' => 'required|string',
		]);

		$credentials = [
			'username' => $request->username,
			'password' => $request->password
		];

		if (Auth::attempt($credentials)) {
			// $request->session()->regenerate();
			$user = $request->user();
			// $token = $user->createToken($user->name)->plainTextToken;
			$user->load("ownerable");
			return [
				"token"	=> $token ?? null,
				"user"	=> $user,
			];
		}
		return abort(401);
	}

	/**
	 * Logout.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
    public function logout(Request $request)
	{
		// Session::flush();
		Auth::logout();
		// Auth::guard('web')->logout();
		return abort(401);
	}
}

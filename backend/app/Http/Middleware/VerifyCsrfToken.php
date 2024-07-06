<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Support\Facades\Log;

class VerifyCsrfToken extends Middleware
{
	/**
	 * The URIs that should be excluded from CSRF verification.
	 *
	 * @var array
	 */
	protected $except = [
		'api/newPacket',
		'api/logPacket',
		'api/activeTest',
		'api/debug/*',
	];

	/**
	 * Get the CSRF token from the request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return string
	 */
	protected function getTokenFromRequest($request)
	{
		$token = $request->input('_token') ?: $request->cookie('XSRF-TOKEN') ?: $request->header('X-XSRF-TOKEN') ;
		return $token;
	}
}

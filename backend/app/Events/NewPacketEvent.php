<?php

namespace App\Events;

use App\Models\Packet;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewPacketEvent implements ShouldBroadcast
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	public $packet;

	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct(Packet $packet)
	{
		$this->packet = $packet;
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return \Illuminate\Broadcasting\Channel|array
	 */
	public function broadcastOn()
	{
		return new PrivateChannel('update');
	}

	public function broadcastAs()
	{
		return 'new-packet';
	}
}

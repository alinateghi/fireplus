<?php

namespace App\Events;

use App\Models\Event;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NewModuleEvent implements ShouldBroadcast
{
	use Dispatchable, InteractsWithSockets;
	use SerializesModels {
		__serialize as protected __parentSerialize;
	}

	public $event;

	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct(Event $event)
	{
		$event->load(['module', 'module.project', 'module.project.organization', 'module.project.company']);
		$event->append('notices');
		$this->event = $event->jsonSerialize();
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
		return 'new-event';
	}
}

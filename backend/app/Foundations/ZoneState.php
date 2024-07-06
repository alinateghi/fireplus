<?php

namespace App\Foundations;


class ZoneState
{
	static $CONNECT_BIT = 0;
	static $STATE_BIT = 1;
	static $FIRE_BIT = 2;
	static $FAULT_BIT = 3;
	static $TEST_BIT = 4;
	static $UPDATE_BIT = 5;

	protected $state;

	function __construct($state)
	{
		$this->state = $state;
	}


	function isInFire()
	{
		return $this->hasFlag(static::$FIRE_BIT);
	}

	function isInFault()
	{
		return $this->hasFlag(static::$FAULT_BIT);
	}

	function isInUpdateMode()
	{
		return $this->hasFlag(static::$UPDATE_BIT);
	}

	function isInTestMode()
	{
		return $this->hasFlag(static::$TEST_BIT);
	}

	function hasFlag($index)
	{
		$mask = pow(2, $index);
		return ($this->state & $mask) === $mask;
	}

	public function getChanges(ZoneState $zs)
	{
		$changes = [];
		if (
			$this->isInFire() !== $zs->isInFire() ||
			$this->isInFault() !== $zs->isInFault()
		) {
			if ($this->isInFire())
				array_push($changes, "fire");
			else if ($this->isInFault())
				array_push($changes, "fault");
			else
				array_push($changes, "normal");
		}
		return $changes;
	}
}

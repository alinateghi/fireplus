// import React from "react";

class PacketDecoder {
	static CONNECT_BIT = 0;
	static STATE_BIT = 1;
	static FIRE_BIT = 2;
	static FAULT_BIT = 3;
	static TEST_BIT = 4;
	static UPDATE_BIT = 5;

	constructor(packet) {
		this.packet = packet;
	}

	getZoneName(num) {
		return this.packet?.data["ZL" + num];
	}

	getZoneStatusData(num) {
		return this.packet?.data["ZS" + num];
	}

	getZoneStatus(num) {
		if (this.isInFire(num)) return 1;
		if (this.isInFault(num)) return 2;
		return 0;
	}

	getZoneStatusString(num) {
		switch (this.getZoneStatus(num)) {
			case 0:
				return "عادی";
			case 1:
				return "آتش";
			case 2:
				return "خطا";
			default:
				return "-";
		}
	}

	getAnt() {
		return this.packet?.data?.ANT ?? 0;
	}

	getSim() {
		return this.packet?.data?.sim ?? "";
	}

	getCharge() {
		return this.packet?.data?.sc ?? 0;
	}

	getAutoCharge() {
		return this.packet?.data?.ac ?? false;
	}

	getFireCount() {
		let count = 0;
		for (let i = 1; i <= 8; i++)
			if (this.isInFire(i)) count++;
		return count;
	}

	getFaultCount() {
		let count = 0;
		for (let i = 1; i <= 8; i++)
			if (this.isInFault(i)) count++;
		return count;
	}

	getUpdateModeCount() {
		let count = 0;
		for (let i = 1; i <= 8; i++)
			if (this.isInUpdateMode(i)) count++;
		return count;
	}

	getTestModeCount() {
		let count = 0;
		for (let i = 1; i <= 8; i++)
			if (this.isInTestMode(i)) count++;
		return count;
	}

	isInFire(num) {
		return this.hasFlag(
			this.getZoneStatusData(num),
			PacketDecoder.FIRE_BIT
		);
	}

	isInFault(num) {
		return this.hasFlag(
			this.getZoneStatusData(num),
			PacketDecoder.FAULT_BIT
		);
	}

	isInUpdateMode(num) {
		return this.hasFlag(
			this.getZoneStatusData(num),
			PacketDecoder.UPDATE_BIT
		);
	}

	isInTestMode(num) {
		return this.hasFlag(
			this.getZoneStatusData(num),
			PacketDecoder.TEST_BIT
		);
	}

	hasData() {
		return this.packet !== undefined && this.packet !== null;
	}

	hasAnyFire() {
		for (let i = 1; i <= 8; i++) {
			if (this.isInFire(i)) return true;
		}
		return false;
	}

	hasAnyFault() {
		for (let i = 1; i <= 8; i++) {
			if (this.isInFault(i)) return true;
		}
		return false;
	}

	hasAnyUpdateMode() {
		for (let i = 1; i <= 8; i++) {
			if (this.isInUpdateMode(i)) return true;
		}
		return false;
	}

	hasAnyTestMode() {
		for (let i = 1; i <= 8; i++) {
			if (this.isInTestMode(i)) return true;
		}
		return false;
	}

	hasFlag(flag, index) {
		let mask = 2 ** index;
		return (flag & mask) === mask;
	}
}

export default PacketDecoder;

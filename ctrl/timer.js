class Timer {
	constructor(controller, interval) {
		this.controller = controller;

		this.interval = interval;

		this.timeZero = new Date();
		this.time = 0;

		this.cycle(this.interval);
	}

	update() {
		var currTime = new Date();
		this.time = currTime.getTime() - this.timeZero.getTime();
	}

	toMSC(miliseconds) {
	/*	Return an object in format {m,s,c} from a value in miliseconds
	*/
	
		var totalCents = Math.floor(miliseconds / 10);	
		var cents = totalCents % 100;

		var totalSeconds = (totalCents - cents) / 100;
		var seconds = totalSeconds % 60;

		var minutes = (totalSeconds - seconds) / 60;

		if (cents.toString().length == 1) {
			cents = `0${cents}`;
		}

		if (seconds.toString().length == 1) {
			seconds = `0${seconds}`;
		}

		return { m: minutes, s: seconds, c: cents };
	}

	push() {
		this.controller.pushTime(this.toMSC(this.time));
	}

	cycle(interval) {
		this.cycleRun = window.setTimeout(() => {
			this.update();
			this.push();

			this.cycle(interval);
		},
		interval);
	}

	stop() {
		clearTimeout(this.cycleRun);
	}
}
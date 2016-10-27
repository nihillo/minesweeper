/*const SIZE = 3; */


function rand(min, max) {
/*	Return a random float between min and max
*/
	var rndCoef = Math.random();
	return min + rndCoef * (max - min); 
}


function randInt(min, max) {
/*	Return a random int between min and max
*/	
	return Math.floor(rand(min, max + 1));
}


function toMinutesSeconds(miliseconds) {
/*	Return a string in format mm:ss from a value in miliseconds
*/
	
	var totalSeconds = Math.floor(miliseconds / 1000);
	
	var seconds = totalSeconds % 60;
	var minutes = (totalSeconds - seconds) / 60;

	if (seconds.toString().length == 1) {
		seconds = `0${seconds}`;
	}

	// if (minutes.toString().length == 1) {
	// 	minutes = `0${minutes}`;
	// }

	return `${minutes}:${seconds}`;
}


function createTimer(htmlElement) {
	// Binds a timer in format m:ss to an htmlElement

	// Init
	var timeZero = new Date();
	var seconds = 0;
	var minutes = 0;
	
	showTimer(htmlElement, minutes, seconds);
	updateTimer(htmlElement, minutes, seconds);

}

function updateTimer (htmlElement, minutes, seconds) {
	window.setTimeout(function(){
		seconds ++;
		if (seconds == 60) {
			minutes++;
			seconds = 0;
		}

		showTimer(htmlElement, minutes, seconds);
		updateTimer(htmlElement, minutes, seconds);
	},
	1000);
}

function showTimer(htmlElement, minutes, seconds) {
	var secondsStr, minutesStr;

	if (seconds.toString().length == 1) {
		secondsStr = '0' + seconds;
	} else {
		secondsStr = seconds;
	}
	
	var timeStr = `${minutes}:${secondsStr}`;
	htmlElement.innerHTML = timeStr;
}
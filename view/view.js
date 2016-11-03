class ViewGame {
	constructor(board, mines) {
		this.content = document.getElementById('content');
		this.board = board;

		this.marksLeft = mines;

		this.drawBoard();
		this.drawInfoPanel();
		this.drawButton();

		// TEST - Show board representation ------------//
		// this.drawTestBoard();
		// ----------------------------------- test //

	}


	drawBoard() {
		this.boardRep = document.createElement('div');
		this.boardRep.className = 'board';
		this.content.appendChild(this.boardRep);

		this.board.forEach((row, rowIndex) => {
			
			var rowRep = document.createElement('div');
			rowRep.className = 'row';
			this.boardRep.appendChild(rowRep);


			row.forEach((cell, cellIndex) => {

				var cellRep = document.createElement('div');
				cellRep.className = 'cell';
				cellRep.setAttribute('data-row', rowIndex);
				cellRep.setAttribute('data-col', cellIndex);
				rowRep.appendChild(cellRep);

			});


		});
	}


	drawInfoPanel() {
		this.infoPanel = document.createElement('div');
		this.infoPanel.className = 'infopanel';
		
		this.infoPanel.innerHTML = `
			<div class="marks-left" id="marks-left"></div>
			<div class="times">
				<div class="time" id="time"><span id="time-m">0</span>:<span id="time-s">00</span>.<span class="time-c" id="time-c">00</span></div>
				<div class="best-time"><span class="best-time-label">BEST TIME: </span><span id="best-time-m">9</span>:<span id="best-time-s">59</span>.<span class="time-c" id="best-time-c">99</span></div>
			</div>
		`;

		this.content.appendChild(this.infoPanel);

		this.marksLeftShow = document.getElementById('marks-left');
		this.updateMarksLeft(0);
	}


	drawButton() {
		this.playAgain = document.createElement('button');
		this.playAgain.id = 'play-again';
		this.playAgain.innerHTML = 'PLAY AGAIN';
		this.playAgain.setAttribute('disabled', '');
		this.content.appendChild(this.playAgain);
	}


	getCell(row, col) {
		return document.querySelectorAll(`[data-row="${row}"][data-col="${col}"]`)[0];
	}


	mark(element) {
		// if (this.marksLeft) {
			element.innerHTML = '·';
			element.setAttribute('data-marked', 'true');

			this.updateMarksLeft(-1);
		// }
	}


	unmark(element) {
		element.innerHTML = '';
		element.removeAttribute('data-marked');

		this.updateMarksLeft(1);
	}


	updateMarksLeft(increment) {
		this.marksLeft += increment;
		this.marksLeftShow.innerHTML = this.marksLeft;
	}


	uncover(element, clicked, value) {
		if (value == 'mine') {
			element.innerHTML = 'x';
			element.className += ' uncovered';

			if (element == clicked) {
				element.className += ' exploded';
			}

		} else {
			value == 0 		? value = ''  : value = value;
			element.className += ' uncovered';
			element.innerHTML = value;
		}		
	}

	showTime(time) {
		document.getElementById('time-m').innerHTML = time.m;
		document.getElementById('time-s').innerHTML = time.s;
		document.getElementById('time-c').innerHTML = time.c;
	}

	showBestTime(time) {
		document.getElementById('best-time-m').innerHTML = time.m;
		document.getElementById('best-time-s').innerHTML = time.s;
		document.getElementById('best-time-c').innerHTML = time.c;
	}

	showEmo(state) {
		var emo = '';
		
		switch(state) {
			case 'win':
				emo = ':)';
				break;
			case 'lose':
				emo = ':(';
				break;
		}

		this.marksLeftShow.innerHTML = emo;
	}




	// drawTestBoard() {
	// 	this.boardRep = document.createElement('div');
	// 	this.boardRep.className = 'board';
	// 	this.content.appendChild(this.boardRep);

	// 	this.board.forEach((row) => {
	// 		var showRow = document.createElement('div');
	// 		showRow.className = 'row';
	// 		this.boardRep.appendChild(showRow);
	// 		row.forEach((cell) => {
	// 			var showCell = document.createElement('div');
	// 			showCell.className = 'cell';
		
	// 			if (cell.mine) {
	// 				showCell.innerHTML = 'x';
	// 				showCell.style.color = 'red';
	// 			} 

	// 			if (cell.counter !== null) {
	// 				showCell.innerHTML = cell.counter;
	// 			} 

	// 			if (cell.counter === 0) {
	// 				showCell.innerHTML = '';
	// 			}

	// 			showRow.appendChild(showCell);
	// 		});
	// 	});
	// }
}
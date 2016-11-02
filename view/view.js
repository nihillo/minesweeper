class ViewGame {
	constructor(board) {
		this.content = document.getElementById('content');
		this.board = board;
		this.drawBoard();
		

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


	getCell(row, col) {
		return document.querySelectorAll(`[data-row="${row}"][data-col="${col}"]`)[0];
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

	mark(element) {

		element.innerHTML = '·';
		element.setAttribute('data-marked', 'true');
	}

	unmark(element) {
		element.innerHTML = '';
		element.removeAttribute('data-marked');
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
}
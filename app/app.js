class Minesweeper {
	constructor(timeStarted) {
		this.size = 8;
		this.mines = 10;

		this.timeStarted = timeStarted;
		this.timeTotal = null;
		this.timeBest = this.getBestTime();

		this.board = new Board(this);

		this.board.dropMines();
		this.board.setCounters();

		this.finished = false;
		this.result = null;
	}

	isValid(row, col) {
		var valid = false;
	
		if (this.board.cells[row] 					&&
			this.board.cells[row][col] 				&&
			!this.board.cells[row][col].uncovered)   {
			valid = true;
		}

		return valid;
	}

	uncover(row, col) {
		var response = {};

		if (this.isValid(row, col)) {

			response.valid = true;

			this.board.cells[row][col].uncovered = true;
			

			if (this.board.cells[row][col].mine) {

				this.finishGame('lose');
				response.value = 'mine';
				// response.finished = true;
				// response.result = 'lose';

			} else {
				
				response.value = this.board.cells[row][col].counter;

				if (this.checkAllUncovered()) {
					this.finishGame('win');
				}
			}


		} else {
			response.valid = false;
		}


		response.finished = this.finished;
		response.result = this.result;


		return response;
	}

	checkAllUncovered() {
		return this.board.checkAllUncovered();
	}

	finishGame(result) {
		if (this.finished == false) {
			this.finished = true;
			this.result = result;
		}
	}

	setTimeTotal(time) {
		this.timeTotal = time;

		// Record time in localStorage if win and timeTotal less than timeBest
		if ((this.result == 'win') && ((this.timeTotal < this.timeBest) || !this.timeBest)) {
			this.recordBestTime(time);
		}
	}

	getBestTime() {
		if (typeof(Storage) !== "undefined") {
			var best = localStorage.getItem('bestTime');

			if (best) {
				return JSON.parse(best);
			}

		} else {
		    console.log('Local storage not supported');
		}
	}


	recordBestTime(time) {
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem('bestTime', time);
		} else {
		    console.log('Local storage not supported');
		}
	}
}



class Board {
	constructor(game) {
		this.game = game;

		this.cells = [];

		
		for (let row = 0; row < this.game.size; row++) {
			this.cells.push([]);
			for (let cell = 0; cell < this.game.size; cell++) {
				this.cells[row].push(new Cell());
			}
		}

	}


	dropMines() {
		for (let mine = 0; mine < this.game.mines; mine++) {
			var cell = [randInt(0, this.game.size -1), randInt(0, this.game.size -1)];

			while (this.cells[cell[0]][cell[1]].mine) {
				cell = [randInt(0, this.game.size -1), randInt(0, this.game.size -1)];
			}

			this.cells[cell[0]][cell[1]].mine = true;
		}
	}


	setCounters() {
		this.cells.forEach((row, rowIndex, matrix) => {
			row.forEach((cell, cellIndex) => {
				
				if (!cell.mine) { // If there is not a mine in the cell

					// Build 3x3 submatrix around the cell, getting null positions where there are no cells (beyond borders)
					var submatrix = [];
		
					for (let i = -1; i < 2; i++) {
						submatrix.push([]);
						for (let j = -1; j < 2; j++) {
							submatrix[i+1].push(findRelCell(matrix, rowIndex, cellIndex, i, j));
						}
					}


					// Count the mines inside the submatrix
					var count = 0;
					submatrix.forEach((smRow) => {
						smRow.forEach((smCell) => {
							if (smCell && smCell.mine) {
								count++;
							}
						});
					});

					// Finally set the counter in the correct cell property
					cell.counter = count;

				}


			});
		});
	}


	get coveredCells() {
		
		var count = 0;

		this.cells.forEach((row) => {
			row.forEach((cell) => {
				if (!cell.mine && !cell.uncovered) {
					count++;
				}
			});
		});

		return count;
	}

	checkAllUncovered() {

		return this.coveredCells === 0;
	}
}



class Cell {
	constructor(board) {
		this.board = board;

		this.mine = false;
		this.counter = null;
		this.uncovered = false;
	}
}
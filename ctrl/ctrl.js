class CtrlGame {
	constructor() {
		this.timer = new Timer(this, 10);
		this.game = new Minesweeper (this.timer.timeZero);
		this.view = new ViewGame(this.game.board.cells, this.game.mines);

		if (this.game.timeBest) {
			this.view.showBestTime(this.timer.toMSC(this.game.timeBest));
		}

		this.generateEvents();
	}

	bindCellEvents(element, row, col){
		element.addEventListener('click', (event) => {
			if (!this.game.finished) {

				if (event.target.hasAttribute('data-marked')) {
					this.toggleMark(event.target);
				} else {
					this.uncover(row, col, event.target, null);
				}
				
			}
		});

		element.addEventListener('contextmenu', (event) => {
			event.preventDefault();

			if (!this.game.finished) {
				this.toggleMark(event.target);
			}

			// return false;
		});
	}

	playAgainEvents() {
		this.view.playAgain.addEventListener('click', (event) => {
			if (!event.target.hasAttribute('disabled')) {
				location.reload();
			}
		});
	}

	generateEvents() {

		// Cell events
		for (let row = 0; row < this.game.size; row++){
			for (let col = 0; col < this.game.size; col++){
				this.bindCellEvents(this.view.getCell(row, col), row, col);
			}
		}

		// Play again events
		this.playAgainEvents();
	}


	uncover(row, col, clicked = null, propagateResult = null) {

		if (this.game.isValid(row, col)) {
			var element = this.view.getCell(row, col);

			var response = this.game.uncover(row, col, propagateResult);
			this.view.uncover(element, clicked, response.value);
			


			// Uncover contiguous cells if response.value === 0
			if (response.value === 0) {

				// Build 3x3 submatrix around the cell, getting null positions where there are no cells (beyond borders)
				var submatrix = [];
	
				for (let i = -1; i < 2; i++) {
					submatrix.push([]);
					for (let j = -1; j < 2; j++) {
						submatrix[i+1].push(findRelCell(this.game.board.cells, row, col, i, j));
					}
				}


				// Uncover the mines inside the submatrix
				submatrix.forEach((smRow, smRowIndex) => {
					smRow.forEach((smCell, smCellIndex) => {
						if (smCell) {
							this.uncover(row + smRowIndex - 1, col + smCellIndex - 1); // Recursion with translated position coords
						}
					});
				});
			}

			// Trigger finish functions if game is finished
			if (response.finished) {
				this.finishGame(response);
			}

		}
	}



	toggleMark(element) {
		if (element.hasAttribute('data-marked')) {
			this.view.unmark(element);
		} else {
			this.view.mark(element);
		}
	}


	markAll() {
		this.game.board.cells.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {

				var element = this.view.getCell(rowIndex, cellIndex);

				if (cell && cell.mine && !element.hasAttribute('data-marked')) {
					this.view.mark(element);
				}
			});
		});
	}


	checkAllUncovered() {
		return this.game.checkAllUncovered();
	}


	finishGame(response) {
		// Register total time
		this.game.setTimeTotal(this.timer.time);

		// Enable play again button 
		this.view.playAgain.removeAttribute('disabled');


		// Mark all mines if win
		if (response.result == 'win') {
			this.markAll();

			this.view.showEmo('win');
		}


		// Uncover all if lose
		else if (response.result == 'lose') {
			this.game.board.cells.forEach((row, rowIndex) => {
				row.forEach((cell, cellIndex) => {
					if (cell) {
						this.uncover(rowIndex, cellIndex, null, 'lose'); // Recursion for every cell
					}
				});
			});

			this.view.showEmo('lose');
		}
	}


	pushTime(time) {
		if (!this.game.finished) {
			this.view.showTime(time);
		}
	}
}


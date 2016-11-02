class CtrlGame {
	constructor() {
		this.game = new Minesweeper ();
		this.view = new ViewGame(this.game.board.cells);

		this.generateEvents();
	}

	bindEvents(element, row, col){
		element.addEventListener('click', (event) => {
			if (!this.game.finished) {
				this.uncover(row, col, event.target);
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

	generateEvents() {
		for (let row = 0; row < this.game.size; row++){
			for (let col = 0; col < this.game.size; col++){
				this.bindEvents(this.view.getCell(row, col), row, col);
			}
		}
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


			// Mark all mines if win
			if (response.result == 'win') {
				this.markAll();
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
				if (cell && cell.mine) {
					this.view.mark(this.view.getCell(rowIndex, cellIndex));
				}
			});
		});
	}


	checkAllUncovered() {
		return this.game.checkAllUncovered();
	}
}


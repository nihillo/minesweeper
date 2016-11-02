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


	uncover(row, col, clicked) {

		if (this.game.isValid(row, col)) {
			var element = this.view.getCell(row, col);

			var value = this.game.uncover(row, col);
			this.view.uncover(element, clicked, value);
			


			// Uncover contiguous cells if value === 0
			if (value === 0) {

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



			// Uncover all if value == 'mine'
			if (value == 'mine') {
				this.game.board.cells.forEach((row, rowIndex) => {
					row.forEach((cell, cellIndex) => {
						if (cell) {
							this.uncover(rowIndex, cellIndex); // Recursion for every cell
						}
					});
				});
			}



			// Mark all mines if all non-mines are uncovered
			if (this.checkAllUncovered()) {
				this.markAll();
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


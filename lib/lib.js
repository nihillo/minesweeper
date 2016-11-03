
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



function findRelCell(array, currRow, currCol, deltaRow, deltaCol) {
	var cell = null;
	if (array[currRow + deltaRow] && 
		array[currRow + deltaRow][currCol + deltaCol])
	{
		cell = array[currRow + deltaRow][currCol + deltaCol];
	}

	return cell;
}
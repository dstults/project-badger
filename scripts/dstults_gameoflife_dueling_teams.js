// Darren Stults
// Dueling life
// Functions ======================================================

const make2dArray = (rows, cols, setTeams = 1) => {
	teams = setTeams;
	let arr = new Array(rows);
	for (let row = 0; row < rows; row++) {
		arr[row] = new Array(cols).fill(0); // fill with initial zeroes
	}
	return arr;
};

const make2dArrayRandom = (rows, cols, setTeams = 1) => {
	teams = setTeams;
	let arr = new Array(rows);
	for (let row = 0; row < rows; row++) {
		arr[row] = new Array(cols); // fill with initial random values
		for (let col = 0; col < cols; col++) {
			arr[row][col] = Math.random() > 0.5 ? Math.trunc(Math.random() * (teams)) + 1 : 0;
		}
	}
	return arr;
};

const addPrefab = (generationGrid, prefab) => {
	const prefabRows = prefab.length;
	const prefabCols = prefab[0].length; // assumes rectangular prefabs
	const prefabOffsetCol = Math.trunc(prefabCols / 2);
	const prefabOffsetRow = Math.trunc(prefabRows / 2);
	let globalRow;
	let globalCol;

	for (let row = 0; row < prefabRows; row++) {
		globalRow = row + centerRow(generationGrid) - prefabOffsetRow;
		for (let col = 0; col < prefabCols; col++) {
			globalCol = col + centerCol(generationGrid) - prefabOffsetCol;
			generationGrid[globalRow][globalCol] = prefab[row][col];
		}
	}
};

const consoleLogGrid = (generation) => {
	console.log('\nGeneration: ' + totalGenerationCount);
	let row;
	for (const arr of generation) {
		row = '';
		for (const cell of arr) {
			row += cell; // defaults to string append
		}
		console.log(row);
	}
};

const getCellNextGen = (currentGen, globalRow, globalCol) => {
	let neighborSum = 0;
	const rows = currentGen.length;
	const cols = currentGen[0].length;
	let localCol;
	let localRow;
	const cellTeams = [];
	for (let offsetX = -1; offsetX < 2; offsetX++) {
		for (let offsetY = -1; offsetY < 2; offsetY++) {
			localCol = (globalCol + offsetX + cols) % cols; // modulus to enable world-wrap
			localRow = (globalRow + offsetY + rows) % rows;
			if (currentGen[localRow][localCol] > 0) {
				neighborSum += 1;
				cellTeams.push(currentGen[localRow][localCol]);
			}
		}
	}
	neighborSum -= currentGen[globalRow][globalCol] > 0 ? 1 : 0;

	let currentState = currentGen[globalRow][globalCol];
	// Game of life rules:
	// - spread life if dead and there are 3 alive neighbors
	// - die if alive and neighboring cells under- (< 2) or over-populated (> 3)
	// - otherwise don't change
	if (currentState === 0 && neighborSum === 3) {
		return cellTeams[Math.trunc(Math.random() * cellTeams.length)];
	} else if (currentState > 0 && (neighborSum < 2 || neighborSum > 3)) {
		return 0;
	} else {
		return currentState;
	}
};

const getNextGen = (thisGeneration, nextGen) => {
	totalGenerationCount++;
	const rows = thisGeneration.length;
	const cols = thisGeneration[0].length;
	if (!nextGen) nextGen = make2dArray(rows, cols);

	// Compute nextGen based on currentGen
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			nextGen[row][col] = getCellNextGen(thisGeneration, row, col);
		}
	}

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			thisGeneration[row][col] = nextGen[row][col];
		}
	}
};

const runXgenerations = (genCount, generationGrid) => {
	if (genCount <= 0)
		throw new Error('runXgenerations: Generation count must be greater than zero.');
	if (!generationGrid)
		throw new Error('runXgenerations: No cell grid supplied.');

	const tempGen = make2dArray(generationGrid.length, generationGrid[0].length);
	for (let i = 1; i <= genCount; i++) {
		getNextGen(generationGrid, tempGen);
	}
}

// Declarations ======================================================

const rPentominoPrefab = [
	[0, 1, 1],
	[1, 1, 0],
	[0, 1, 0]
];
const acornPrefab = [
	[0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 0, 0, 0],
	[1, 1, 0, 0, 1, 1, 1]
];
let totalGenerationCount = 0;
let teams = 1;
const centerY = (grid) => Math.trunc(grid.length / 2);
const centerCol = (grid) => Math.trunc(grid[0].length / 2);

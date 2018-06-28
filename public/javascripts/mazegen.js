/*jshint esversion: 6 */
'use strict';

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

var canvas;
var cC;
var div;
var mazeGenButton;
var gridHeight;
var gridWidth;
var grid;
var size;
var playerColor;
var difficulty;
var keyState = {};
var gameTimeout;
var gameRunning = false;
var timerLoop = 0;

var playerXPos;
var playerYPos;

var startTime;
var currentTime = 0;
var gameRunTime = '0.0';
var gameTimeDisplay = document.getElementById('gameTimeDisplay');

var path;


$(document).ready(function () {
    canvas = null;
    div = document.getElementById('canvascontainer');
    mazeGenButton = document.getElementById("mazeGenButton");
    mazeGenButton.onclick = drawMaze;
    gameTimeDisplay.innerHTML = gameRunTime;
});

var drawMaze = function () {
    if (canvas != null) {
        //set everything back
        div.removeChild(document.getElementById("myCanvas"));
        canvas = undefined;
        cC = undefined;
        div = undefined;
        mazeGenButton = undefined;
        gridHeight = undefined;
        gridWidth = undefined;
        grid = undefined;
        size = undefined;
        playerColor = undefined;
        difficulty = undefined;
        keyState = {};
        playerXPos = undefined;
        playerYPos = undefined;
        stopGameLoop();
    }
    div = document.getElementById('canvascontainer');
    canvas = document.createElement('canvas');
    canvas.id = "myCanvas";
    canvas.width = 1000;
    canvas.height = 1000;
    div.appendChild(canvas);
    //remove event listeners
    window.removeEventListener("keydown", keysTrue, true);
    window.removeEventListener("keydown", keysFalse, true);

    cC = canvas.getContext("2d");
    cC.moveTo(0, 0);
    cC.clearRect(0, 0, canvas.width, canvas.height);
    playerColor = document.getElementById("playercolor").value;
    //Set up constants
    difficulty = document.getElementById("difficulty");
    size = difficulty.options[difficulty.selectedIndex].value;
    grid = [];


    gridHeight = Math.floor(canvas.offsetHeight / size);
    gridWidth = Math.floor(canvas.offsetWidth / size);

    //create 2D array or array of arrays and fill with cells
    for (let row = 0; row < gridHeight; row++) {
        grid[row] = [];
        for (let col = 0; col < gridWidth; col++) {
            grid[row][col] = new Cell(row, col);
        }
    }

    //---------------------------Key Press Handler-----------------------------//
    window.addEventListener('keydown', keysTrue, true);
    window.addEventListener('keyup', keysFalse, true);
    //-------------------------------------------------------------------------//

    randPrimsAlgo(1, 1);
    entryAndExit();
    drawItAll();
    startGame();
};

//---------------------------cell object-----------------------------//
function Cell(x, y) {
    this.row = x;
    this.col = y;
    this.wall = true;
    this.player = false;
    this.end = false;
    this.neighborList = [];
    this.neighborList2 = [];
}

Cell.prototype.drawCell = function () {
    let levelName = difficulty.options[difficulty.selectedIndex].text;
    if (this.wall && levelName !== "Koga") {
        cC.fillStyle = '#000000';
        cC.fillRect(this.row * size, this.col * size, size, size);
    }
    else if (!this.wall || levelName === "Koga") {
        cC.clearRect(this.row * size, this.col * size, size, size);
    }

    if (this.player) {
        cC.fillStyle = "#" + playerColor;
        cC.fillRect(this.row * size, this.col * size, size, size);
    }
    if (this.end) {
        cC.fillStyle = "#ff0000";
        cC.fillRect(this.row * size, this.col * size, size, size);
    }

};

Cell.prototype.isWall = function () {
    if (this.wall == true) {
        return true;
    }
    else return false;
}

Cell.prototype.clearCell = function () {
    cC.clearRect(this.row * size, this.col * size, size, size);
}

Cell.prototype.hasNeighbors = function () {
    if (this.neighborList.length > 0) {
        return true;
    }
    else {
        return false;
    }
};

Cell.prototype.setPlayerCell = function () {
    if (!this.wall && !this.player) {
        this.player = true;
    }
    else {
        this.player = false;
    }
}

Cell.prototype.removePlayerCell = function () {
    this.player = false;
}
//--------------------------------------------------------------------//

function drawItAll() {
    for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
            grid[row][col].drawCell();
        }
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function findNeighbors(cellToFindNeighborsOf) {
    var currentCell = cellToFindNeighborsOf;
    currentCell.neighborList = [];
    currentCell.neighborList2 = [];

    //add neighboring cells to neighborList
    if (currentCell.col - 1 >= 0) {
        var leftNeighbor = grid[currentCell.row][currentCell.col - 1];
        if (leftNeighbor.wall) {
            currentCell.neighborList.push(leftNeighbor);
        }
    }
    if (currentCell.col + 1 < grid[0].length) {
        var rightNeighbor = grid[currentCell.row][currentCell.col + 1];
        if (rightNeighbor.wall) {
            currentCell.neighborList.push(rightNeighbor);
        }
    }
    if (currentCell.row - 1 >= 0) {
        var topNeighbor = grid[currentCell.row - 1][currentCell.col];
        if (topNeighbor.wall) {
            currentCell.neighborList.push(topNeighbor);
        }
    }
    if (currentCell.row + 1 < grid.length) {
        var bottomNeighbor = grid[currentCell.row + 1][currentCell.col];
        if (bottomNeighbor.wall) {
            currentCell.neighborList.push(bottomNeighbor);
        }
    }
}

function randPrimsAlgo(row, col) {

    //add starting cell to maze
    var currentCell = grid[row][col];
    currentCell.wall = false;

    findNeighbors(currentCell);
    while (currentCell.hasNeighbors()) {
        currentCell.neighborList = shuffle(currentCell.neighborList);
        var nextNeighbor = currentCell.neighborList[currentCell.neighborList.length - 1];
        findNeighbors(nextNeighbor);
        for (var i = 0; i < nextNeighbor.neighborList.length; i++) {
            if (nextNeighbor.neighborList[i].row == currentCell.row - 2 || nextNeighbor.neighborList[i].row == currentCell.row + 2 || nextNeighbor.neighborList[i].col == currentCell.col - 2 || nextNeighbor.neighborList[i].col == currentCell.col + 2) {
                nextNeighbor.wall = false;
                randPrimsAlgo(nextNeighbor.neighborList[i].row, nextNeighbor.neighborList[i].col);
            }
        }
        currentCell.neighborList.pop();
    }

}

function entryAndExit() {
    grid[0][1].wall = false;
    grid[gridWidth - 1][(gridHeight - 1) - 1].wall = false;
    grid[gridWidth - 1][(gridHeight - 1) - 1].end = true;
}

var keysTrue = function (e) {

    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
    keyState[e.keyCode || e.which] = true;
}
var keysFalse = function (e) {
    keyState[e.keyCode || e.which] = false;
}

var drawSurroundingCells = function () {
    grid[playerXPos][playerYPos].drawCell();

    if (playerXPos - 1 >= 0 && playerYPos - 1 >= 0) grid[playerXPos - 1][playerYPos - 1].drawCell();
    if (playerXPos - 1 >= 0 && playerYPos + 1 < grid[0].length) grid[playerXPos - 1][playerYPos + 1].drawCell();
    if (playerXPos - 1 >= 0) grid[playerXPos - 1][playerYPos].drawCell();
    if (playerXPos + 1 < grid.length && playerYPos - 1 >= 0) grid[playerXPos + 1][playerYPos - 1].drawCell();
    if (playerXPos + 1 < grid.length && playerYPos + 1 < grid[0].length) grid[playerXPos + 1][playerYPos + 1].drawCell();
    if (playerXPos + 1 < grid.length) grid[playerXPos + 1][playerYPos].drawCell();
    if (playerYPos + 1 < grid[0].length) grid[playerXPos][playerYPos + 1].drawCell();
    if (playerYPos - 1 >= 0) grid[playerXPos][playerYPos - 1].drawCell();
}

var isLegalMove = function (x, y) {
    if (x >= 0 && x < gridWidth && y >= 0 && y <= gridHeight) {
        if (!grid[x][y].isWall()) {
            if (grid[x][y].end == true) {
                stopGameLoop();
                addHighscore(difficulty.options[difficulty.selectedIndex].text);
            }
            return true;
        }
        return false;
    }
    else {
        return false;
    }
}

var startGame = function () {
    gameRunning = true;
    playerXPos = 0;
    playerYPos = 1;
    grid[playerXPos][playerYPos].setPlayerCell();
    startGameTimer();
    gameLoop();
};

function startGameTimer() {
    startTime = new Date().getTime();
    currentTime = 0;
    gameRunTime = '0.0';
    timerLoop = setTimeout(updateGameTimer, 100);
}

function updateGameTimer() {
    currentTime += 100;

    gameRunTime = Math.floor(currentTime / 100) / 10;
    if (Math.round(gameRunTime) == gameRunTime) { gameRunTime += '.0'; }

    gameTimeDisplay.innerHTML = gameRunTime;

    var diff = (new Date().getTime() - startTime) - currentTime;
    timerLoop = setTimeout(updateGameTimer, (100 - diff));
}

function stopGameTimer() {
    clearTimeout(timerLoop);
}

function gameLoop() {
    if (gameRunning == false) {
        return;
    }
    //left
    if (keyState[37] || keyState[65]) {
        if (isLegalMove(playerXPos - 1, playerYPos)) {
            grid[playerXPos][playerYPos].removePlayerCell();
            playerXPos -= 1;
            grid[playerXPos][playerYPos].setPlayerCell();
        }
    }
    //right
    if (keyState[39] || keyState[68]) {
        if (isLegalMove(playerXPos + 1, playerYPos)) {
            grid[playerXPos][playerYPos].removePlayerCell();
            playerXPos += 1;
            grid[playerXPos][playerYPos].setPlayerCell();
        }
    }
    //up
    if (keyState[38] || keyState[87]) {
        if (isLegalMove(playerXPos, playerYPos - 1)) {
            grid[playerXPos][playerYPos].removePlayerCell();
            playerYPos -= 1;
            grid[playerXPos][playerYPos].setPlayerCell();
        }
    }
    //down
    if (keyState[40] || keyState[83]) {
        if (isLegalMove(playerXPos, playerYPos + 1)) {
            grid[playerXPos][playerYPos].removePlayerCell();
            playerYPos += 1;
            grid[playerXPos][playerYPos].setPlayerCell();
        }
    }

    drawSurroundingCells();
    gameTimeout = setTimeout(gameLoop, 50);
}

function stopGameLoop() {
    gameRunning = false;
    stopGameTimer();
    clearTimeout(gameTimeout);
}

function addHighscore(levelName) {
    var person = prompt("Congratulations, You finished " + levelName + " difficulty in " + gameRunTime + " seconds. Please enter your name:");

    if (person != null) {

        if (levelName == "Kris") {
            //post to highscore
            $.post("/krishighscore",
                {
                    name: person,
                    score: gameRunTime,
                },
                function (msg) {
                    alert(msg);
                }
            );
        }
        else if (levelName == "Easy") {
            $.post("/easyhighscore",
                {
                    name: person,
                    score: gameRunTime,
                },
                function (msg) {
                    alert(msg);
                }
            );
        }
        else if (levelName == "Medium") {
            $.post("/mediumhighscore",
                {
                    name: person,
                    score: gameRunTime,
                },
                function (msg) {
                    alert(msg);
                }
            );
        }
        else if (levelName == "Hard") {
            $.post("/hardhighscore",
                {
                    name: person,
                    score: gameRunTime,
                },
                function (msg) {
                    alert(msg);
                }
            );
        }
        else if (levelName == "Insane") {
            $.post("/insanehighscore",
                {
                    name: person,
                    score: gameRunTime,
                },
                function (msg) {
                    alert(msg);
                }
            );
        }
        else if (levelName == "Impossible") {
            $.post("/impossiblehighscore",
                {
                    name: person,
                    score: gameRunTime,
                },
                function (msg) {
                    alert(msg);
                }
            );
        }
        else if (levelName == "Koga") {
            $.post("/kogahighscore",
                {
                    name: person,
                    score: gameRunTime,
                },
                function (msg) {
                    alert(msg);
                }
            );
        }
    }
}

function showPath(){
    var graph = new Graph(getWallGrid());
    var start = graph.nodes[0][1];
    // return graph.toString();
    var end = graph.nodes[gridWidth - 1][(gridHeight - 1) - 1];
    var result = astar.search(graph, start, end);
    return result;
}

function getWallGrid(){
    var wallGrid = []
    for (let row = 0; row < gridHeight; row++) {
        wallGrid[row] = [];
        for (let col = 0; col < gridWidth; col++) {
            wallGrid[row][col] = grid[row][col].isWall() ? 0 : 1;
        }
    }
    return wallGrid;
}

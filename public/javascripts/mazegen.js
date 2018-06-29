/*jshint esversion: 6 */
'use strict';

var canvas;
var cC;
var div;
var mazeGenButton;
var gridHeight;
var gridWidth;
var grid;
var size;
var playerColor;
var difficulty = {};
var keyState = {};
var gameTimeout;
var gameRunning = false;
var timerLoop = 0;

var playerXPos;
var playerYPos;
var playerFacing;

var startTime;
var currentTime = 0;
var gameRunTime = '0.0';
var gameTimeDisplay = document.getElementById('gameTimeDisplay');

var wallImage = new Image();
var floorImage = new Image();
var leftPlayerImage = new Image();
var rightPlayerImage = new Image();
var upPlayerImage = new Image();
var downKogaImage = new Image();
var leftKogaImage = new Image();
var rightKogaImage = new Image();
var upKogaImage = new Image();
var downPlayerImage = new Image();
var kogaPathUp = new Image();
var kogaPathDown = new Image();
var kogaPathLeft = new Image();
var kogaPathRight = new Image();
wallImage.src = '/public/sprites/koga/game/wall.png';
floorImage.src = '/public/sprites/koga/game/floor.png';
leftPlayerImage.src = '/public/sprites/koga/player/left.png';
rightPlayerImage.src = '/public/sprites/koga/player/right.png';
upPlayerImage.src = '/public/sprites/koga/player/up.png';
downPlayerImage.src = '/public/sprites/koga/player/down.png';
leftKogaImage.src = '/public/sprites/koga/koga/left.png';
rightKogaImage.src = '/public/sprites/koga/koga/right.png';
upKogaImage.src = '/public/sprites/koga/koga/up.png';
downKogaImage.src = '/public/sprites/koga/koga/down.png';
kogaPathUp.src = '/public/sprites/koga/path/up.png';
kogaPathDown.src = '/public/sprites/koga/path/down.png';
kogaPathLeft.src = '/public/sprites/koga/path/left.png';
kogaPathRight.src = '/public/sprites/koga/path/right.png';

$(document).ready(function() {
    canvas = null;
    div = document.getElementById('canvascontainer');
    mazeGenButton = document.getElementById('mazeGenButton');
    mazeGenButton.onclick = drawMaze;
    gameTimeDisplay.innerHTML = gameRunTime;
});

var drawMaze = function() {
    if (canvas != null) {
        //set everything back
        div.removeChild(document.getElementById('myCanvas'));
        canvas = undefined;
        cC = undefined;
        div = undefined;
        mazeGenButton = undefined;
        gridHeight = undefined;
        gridWidth = undefined;
        grid = undefined;
        size = undefined;
        playerColor = undefined;
        difficulty = {};
        keyState = {};
        playerXPos = undefined;
        playerYPos = undefined;
        playerFacing = undefined;
        stopGameLoop();
    }
    div = document.getElementById('canvascontainer');
    canvas = document.createElement('canvas');
    canvas.id = 'myCanvas';
    canvas.width = 1000;
    canvas.height = 1000;
    div.appendChild(canvas);
    //remove event listeners
    window.removeEventListener('keydown', keysTrue, true);
    window.removeEventListener('keydown', keysFalse, true);

    cC = canvas.getContext('2d');
    cC.moveTo(0, 0);
    cC.clearRect(0, 0, canvas.width, canvas.height);
    playerColor = document.getElementById('playercolor').value;
    //Set up constants
    const difficultyElement = document.getElementById('difficulty');
    difficulty.value = difficultyElement.options[difficultyElement.selectedIndex].value;
    difficulty.name = difficultyElement.options[difficultyElement.selectedIndex].text;

    size = difficulty.value;
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
    this.answer = {
        isAnswer: false,
        nextDirection: 'none'
    };
}

Cell.prototype.drawCell = function() {
    let levelName = difficulty.name;
    if (levelName == 'Koga') {
        if (this.wall) {
            cC.drawImage(
                wallImage,
                this.row * size,
                this.col * size,
                size,
                size
            );
        } else if (!this.wall) {
            cC.drawImage(
                floorImage,
                this.row * size,
                this.col * size,
                size,
                size
            );
        }
        if (this.player) {
            let spriteToDraw;
            switch (playerFacing) {
                case 'left':
                    spriteToDraw = leftPlayerImage;
                    break;
                case 'right':
                    spriteToDraw = rightPlayerImage;
                    break;
                case 'up':
                    spriteToDraw = upPlayerImage;
                    break;
                case 'down':
                    spriteToDraw = downPlayerImage;
                    break;
            }
            cC.drawImage(
                spriteToDraw,
                this.row * size,
                this.col * size,
                size,
                size
            );
        } else if (this.answer.isAnswer) {
            let spriteToDraw;
            switch (this.answer.nextDirection) {
                case 'left':
                    spriteToDraw = kogaPathLeft;
                    break;
                case 'right':
                    spriteToDraw = kogaPathRight;
                    break;
                case 'up':
                    spriteToDraw = kogaPathUp;
                    break;
                case 'down':
                    spriteToDraw = kogaPathDown;
                    break;
                default:
                    spriteToDraw = kogaPathRight;
            }
            cC.drawImage(
                spriteToDraw,
                this.row * size,
                this.col * size,
                size,
                size
            );
        }
        if (this.end) {
            cC.drawImage(
                downKogaImage,
                this.row * size,
                this.col * size,
                size,
                size
            );
        }
    } else {
        if (this.wall) {
            cC.fillStyle = '#000000';
            cC.fillRect(this.row * size, this.col * size, size, size);
        } else if (!this.wall) {
            cC.clearRect(this.row * size, this.col * size, size, size);
        }
        if (this.player) {
            cC.fillStyle = '#' + playerColor;
            cC.fillRect(this.row * size, this.col * size, size, size);
        } else if (this.answer.isAnswer) {
            cC.fillStyle = '#00ff00';
            cC.fillRect(this.row * size, this.col * size, size, size);
        }
        if (this.end) {
            cC.fillStyle = '#ff0000';
            cC.fillRect(this.row * size, this.col * size, size, size);
        }
    }
};

Cell.prototype.isWall = function() {
    if (this.wall == true) {
        return true;
    } else return false;
};

Cell.prototype.clearCell = function() {
    cC.clearRect(this.row * size, this.col * size, size, size);
};

Cell.prototype.hasNeighbors = function() {
    if (this.neighborList.length > 0) {
        return true;
    } else {
        return false;
    }
};

Cell.prototype.setPlayerCell = function() {
    if (!this.wall && !this.player) {
        this.player = true;
    } else {
        this.player = false;
    }
};

Cell.prototype.removePlayerCell = function() {
    this.player = false;
};
//--------------------------------------------------------------------//

function drawItAll() {
    for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
            grid[row][col].drawCell();
        }
    }
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

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
        var nextNeighbor =
            currentCell.neighborList[currentCell.neighborList.length - 1];
        findNeighbors(nextNeighbor);
        for (var i = 0; i < nextNeighbor.neighborList.length; i++) {
            if (
                nextNeighbor.neighborList[i].row == currentCell.row - 2 ||
                nextNeighbor.neighborList[i].row == currentCell.row + 2 ||
                nextNeighbor.neighborList[i].col == currentCell.col - 2 ||
                nextNeighbor.neighborList[i].col == currentCell.col + 2
            ) {
                nextNeighbor.wall = false;
                randPrimsAlgo(
                    nextNeighbor.neighborList[i].row,
                    nextNeighbor.neighborList[i].col
                );
            }
        }
        currentCell.neighborList.pop();
    }
}

function entryAndExit() {
    grid[0][1].wall = false;
    grid[gridWidth - 1][gridHeight - 1 - 1].wall = false;
    grid[gridWidth - 1][gridHeight - 1 - 1].end = true;
}

var keysTrue = function(e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
    keyState[e.keyCode || e.which] = true;
};
var keysFalse = function(e) {
    keyState[e.keyCode || e.which] = false;
};

var drawSurroundingCells = function() {
    grid[playerXPos][playerYPos].drawCell();

    if (playerXPos - 1 >= 0 && playerYPos - 1 >= 0)
        grid[playerXPos - 1][playerYPos - 1].drawCell();
    if (playerXPos - 1 >= 0 && playerYPos + 1 < grid[0].length)
        grid[playerXPos - 1][playerYPos + 1].drawCell();
    if (playerXPos - 1 >= 0) grid[playerXPos - 1][playerYPos].drawCell();
    if (playerXPos + 1 < grid.length && playerYPos - 1 >= 0)
        grid[playerXPos + 1][playerYPos - 1].drawCell();
    if (playerXPos + 1 < grid.length && playerYPos + 1 < grid[0].length)
        grid[playerXPos + 1][playerYPos + 1].drawCell();
    if (playerXPos + 1 < grid.length)
        grid[playerXPos + 1][playerYPos].drawCell();
    if (playerYPos + 1 < grid[0].length)
        grid[playerXPos][playerYPos + 1].drawCell();
    if (playerYPos - 1 >= 0) grid[playerXPos][playerYPos - 1].drawCell();
};

var isLegalMove = function(x, y) {
    if (x >= 0 && x < gridWidth && y >= 0 && y <= gridHeight) {
        if (!grid[x][y].isWall()) {
            if (grid[x][y].end == true) {
                stopGameLoop();
                addHighscore(difficulty.name);
            }
            return true;
        }
        return false;
    } else {
        return false;
    }
};

var startGame = function() {
    gameRunning = true;
    playerXPos = 0;
    playerYPos = 1;
    playerFacing = 'right';
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
    if (Math.round(gameRunTime) == gameRunTime) {
        gameRunTime += '.0';
    }

    gameTimeDisplay.innerHTML = gameRunTime;

    var diff = new Date().getTime() - startTime - currentTime;
    timerLoop = setTimeout(updateGameTimer, 100 - diff);
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
            playerFacing = 'left';
            grid[playerXPos][playerYPos].setPlayerCell();
        }
    }
    //right
    if (keyState[39] || keyState[68]) {
        if (isLegalMove(playerXPos + 1, playerYPos)) {
            grid[playerXPos][playerYPos].removePlayerCell();
            playerXPos += 1;
            playerFacing = 'right';
            grid[playerXPos][playerYPos].setPlayerCell();
        }
    }
    //up
    if (keyState[38] || keyState[87]) {
        if (isLegalMove(playerXPos, playerYPos - 1)) {
            grid[playerXPos][playerYPos].removePlayerCell();
            playerYPos -= 1;
            playerFacing = 'up';
            grid[playerXPos][playerYPos].setPlayerCell();
        }
    }
    //down
    if (keyState[40] || keyState[83]) {
        if (isLegalMove(playerXPos, playerYPos + 1)) {
            grid[playerXPos][playerYPos].removePlayerCell();
            playerYPos += 1;
            playerFacing = 'down';
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
    var person = prompt(
        'Congratulations, You finished ' +
            levelName +
            ' difficulty in ' +
            gameRunTime +
            ' seconds. Please enter your name:'
    );

    if (person != null) {
        if (levelName == 'Kris') {
            //post to highscore
            $.post(
                '/krishighscore',
                {
                    name: person,
                    score: gameRunTime
                },
                function(msg) {
                    alert(msg);
                }
            );
        } else if (levelName == 'Easy') {
            $.post(
                '/easyhighscore',
                {
                    name: person,
                    score: gameRunTime
                },
                function(msg) {
                    alert(msg);
                }
            );
        } else if (levelName == 'Medium') {
            $.post(
                '/mediumhighscore',
                {
                    name: person,
                    score: gameRunTime
                },
                function(msg) {
                    alert(msg);
                }
            );
        } else if (levelName == 'Hard') {
            $.post(
                '/hardhighscore',
                {
                    name: person,
                    score: gameRunTime
                },
                function(msg) {
                    alert(msg);
                }
            );
        } else if (levelName == 'Insane') {
            $.post(
                '/insanehighscore',
                {
                    name: person,
                    score: gameRunTime
                },
                function(msg) {
                    alert(msg);
                }
            );
        } else if (levelName == 'Impossible') {
            $.post(
                '/impossiblehighscore',
                {
                    name: person,
                    score: gameRunTime
                },
                function(msg) {
                    alert(msg);
                }
            );
        } else if (levelName == 'Koga') {
            $.post(
                '/kogahighscore',
                {
                    name: person,
                    score: gameRunTime
                },
                function(msg) {
                    alert(msg);
                }
            );
        }
    }
}

function showPath() {
    var graph = new Graph(getWallGrid());
    var start = graph.grid[0][1];
    var end = graph.grid[gridWidth - 1][gridHeight - 1 - 1];
    var answer = astar.search(graph, start, end);
    answer.forEach((element, index, ogArray) => {
        let nextIndex = index++ < ogArray.length - 1 ? index++ : 0;
        if (element.x > ogArray[nextIndex].x) {
            element.nextDirection = 'left';
        }
        if (element.x < ogArray[nextIndex].x) {
            element.nextDirection = 'right';
        }
        if (element.y > ogArray[nextIndex].y) {
            element.nextDirection = 'up';
        }
        if (element.y < ogArray[nextIndex].y) {
            element.nextDirection = 'down';
        }
        grid[element.x][element.y].answer.isAnswer = true;
        grid[element.x][element.y].answer.nextDirection = element.nextDirection;
    });
    drawItAll();
}

function getWallGrid() {
    var wallGrid = [];
    for (let row = 0; row < gridHeight; row++) {
        wallGrid[row] = [];
        for (let col = 0; col < gridWidth; col++) {
            wallGrid[row][col] = grid[row][col].isWall() ? 0 : 1;
        }
    }
    return wallGrid;
}

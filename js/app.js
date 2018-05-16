//Score Object

// sets initial score to 500
var Score = function () {
    this.score = 500;
    this.gameOver = false;
};

//appends score to html when game starts/restart
//empties the html so that the score is cleared and new score is added
Score.prototype.displayScore = function () {
    $(".score").empty().append(this.score);
};

//increases the score by 100 when sprite reaches water and displays score
Score.prototype.earnPoints = function () {
    this.score += 100;
    this.scoreFreeze();
    this.displayScore();
};

// decreases the points by 100 when sprite get hits by bug and displays score
Score.prototype.loosePoints = function () {
    this.score -= 100;
    this.scoreFreeze();
    this.displayScore();
};

//resets the score to 500 and displays score
Score.prototype.reset = function () {
    this.score = 500;
    this.displayScore();
    this.gameOver = false;
};

// win modal pops up when the score is 1000
Score.prototype.win = function () {
    if (this.score === 1000) {
        this.gameOver = true;
        console.log("win", this);
        $(".modal-title").empty().append("Congratulations!");
        $(".modal-body").empty().append("<p>You Win!</p>");
        $("#myModal").modal("show");

        //resets the score when the play again button is hit
        var scope = this; //makes the scope score
        $("#play-again").on('click', function () {
            console.log("button", this);
            scope.reset();
        });
    }
};

//loose modal pops up when score reaches 0
Score.prototype.loose = function () {
    if (this.score === 0) {
        console.log("loose:", this);
        this.gameOver = true;
        $(".modal-title").empty().append("Sorry!");
        $(".modal-body").empty().append("<p>You Loose!</p>");
        $("#myModal").modal("show");

        //resets score when play again button is hit
        var scope = this;//makes the scope score
        $("#play-again").on('click', function () {
            scope.reset();
        });
    }
};

Score.prototype.scoreFreeze = function () {
    if (this.score >= 1000){
        this.score = 1000;
    }
    if (this.score <= 0){
        this.score = 0;
    }
};

//Enemy Object
// Enemies our player must avoid
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 67;
    this.speed = Math.floor((Math.random() * 250) + 100);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x < 500) {
        this.x = this.x + this.speed * dt;
    }
    else this.x = -20;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Class
var Player = function (score) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.w = 65;
    this.h = 75;
    this.score = score;
};

Player.prototype.update = function () {
    this.collision();
    this.checkBoundaries();
    this.reachWater();
};

//
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//determines how big a jump the player will make
Player.prototype.handleInput = function (direction) {
    var verticalSize = 85;
    var horizontalSize = 100;
    if (this.score.gameOver){
        return;
    }
    if (direction === 'left') {
        this.x = this.x - horizontalSize;
    }
    if (direction === 'right') {
        this.x = this.x + horizontalSize;
    }
    if (direction === 'up') {
        this.y = this.y - verticalSize;
    }
    if (direction === 'down') {
        this.y = this.y + verticalSize;
    }
};

//does not let player go out of bounds
Player.prototype.checkBoundaries = function () {
    if (this.y >= 400) {
        this.y = 400;
    }
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.x >= 400) {
        this.x = 400;
    }
};

//checks for collisions
Player.prototype.collision = function () {
    allEnemies.forEach(function (enemy) {
        if (this.x < enemy.x + enemy.w &&
            this.x + this.w > enemy.x &&
            this.y < enemy.y + enemy.h &&
            this.h + this.y > enemy.y) {
            // subtract points when hit and display score
            this.score.loosePoints();

            //sprite goes to start position
            this.startPosition();

            // if score = 0, loose modal pops up
            this.looseGame();
        }
    }, this);
};

//sets starting position for player
Player.prototype.startPosition = function () {
    this.x = 200;
    this.y = 400;
};

// when player reaches the water
Player.prototype.reachWater = function () {
    if (this.y < 50) {
        this.score.earnPoints();
        this.startPosition();
        this.winGame();
    }
};

Player.prototype.winGame = function () {
    this.score.win();

    if (this.score.playAgain) {
        this.startPosition();
    }
};
//
Player.prototype.looseGame = function () {
    this.score.loose();
    if (this.score.playAgain = true) {
        this.startPosition();
    }
};


//Instantiates objects
var allEnemies = ([new Enemy(0, 220), new Enemy(0, 140), new Enemy(0, 58), new Enemy(200, 58)]);
var score = new Score();
var player = new Player(score, allEnemies);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



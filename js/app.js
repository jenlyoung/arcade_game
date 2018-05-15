
var Score = function (){
    this.score = 500;
};

Score.prototype.startScore = function(){
    $(".score").empty().append(this.score);
};

Score.prototype.earnPoints = function() {
    this.score += 100;

    // if (this.score > 1000){
    //     this.score = 1000;
    // }
};

Score.prototype.loosePoints = function() {
    this.score -= 100;
    // if (this.score < 0){
    //     this.score = 0;
    // }
};

Score.prototype.win = function() {
    if (this.score === 600) {
        $(".modal-title").empty().append("Congratulations!");
        $(".modal-body").empty().append("<p>You Win!</p>");
        $("#myModal").modal("show");
        this.reset();
    }
};

Score.prototype.loose = function() {
    if (this.score === 400){
        $(".modal-title").empty().append("Sorry!");
        $(".modal-body").empty().append("<p>You Loose!</p>");
        $("#myModal").modal("show");
        this.reset();
    }
};

Score.prototype.reset = function() {
    this.score = 500;
}

// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 67;
    this.speed = Math.floor((Math.random() * 200) + 100);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x < 500) {
        this.x = this.x + this.speed * dt;
    }
    else this.x = -20;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// Enemy.prototype.collision = function (player) {
//     allEnemies.forEach(function (enemy) {
//         if (player.x < this.x + this.w &&
//         player.x + player.w > this.x &&
//         player.y < this.y + this.h &&
//         player.h + player.y > this.y) {
//         // collision detected!
//         alert ("collision");
//     }
// };


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // drawBox(this.x, this.y + 77, 100, 67, "yellow");
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (score) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.w = 65;
    this.h = 75;
    this.score = score;
};

Player.prototype.update = function () {
    player.checkBoundaries();
    player.collision();
    player.winGame();
};

//
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // drawBox(this.x + 18, this.y + 60, 65, 75
    //     , "yellow");
};

Player.prototype.handleInput = function (direction) {
    var verticalSize = 85;
    var horizontalSize = 100;
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
        console.log(this.y);
    }
};

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

Player.prototype.collision = function () {
    // console.log(allEnemies);
    // var scope = this;
    allEnemies.forEach(function (enemy) {
        // console.log("scope", scope);
        // console.log("this", this);
        if (this.x < enemy.x + enemy.w &&
            this.x + this.w > enemy.x &&
            this.y < enemy.y + enemy.h &&
            this.h + this.y > enemy.y) {
            // enemy.speed = 0;
            this.startPosition();
            // this.score.updateScore();
            this.score.loosePoints();
            this.score.loose();
        }
    }, this);
};

// Enemy.prototype.collision = function (player) {
//     allEnemies.forEach(function (enemy) {
//         if (player.x < enemy.x + enemy.w &&
//             player.x + player.w > enemy.x &&
//             player.y < enemy.y + enemy.h &&
//             player.h + player.y > enemy.y) {
//             // collision detected!
//             alert ("collision");
//         }
//     });
// };

Player.prototype.startPosition = function() {
    this.x = 200;
    this.y = 400;
    this.score.startScore();
};

Player.prototype.winGame = function() {
    if (this.y < 50){
        this.score.earnPoints();
        this.startPosition();
        this.score.win();
    }
};

//
// var Modal = function (score){
//     this.winMessage = "Congratulations! You won!",
//     this.looseMessage = "You Loose!",
//     this.placeMessage = function () {
//         if (this.score === 600){
//             $(".modal-title").append(this.winMessage());
//         }
//     }
//
// };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(100, 220), new Enemy(0, 140), new Enemy(50, 58)];

var score = new Score();
var player = new Player(score);
// var modal = new Modal(score);


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



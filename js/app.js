var Score = function (){
    this.score = 100;
}

Score.prototype.updateScore = function(){
    console.log(this.score);
}
// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.w = 60;
    this.h = 40;
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

// Enemy.prototype.collision = function (player) {
//     if (player.x < this.x + this.w &&
//         player.x + player.w > this.x &&
//         player.y < this.y + this.h &&
//         player.h + player.y > this.y) {
//         // collision detected!
//         // alert ("collision");
//         isCollision = true;
//     }
// };


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (score) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 440;
    this.w = 60;
    this.h = 40;
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
};

Player.prototype.handleInput = function (direction) {
    if (direction === 'left') {
        this.x = this.x - 50;
    }
    if (direction === 'right') {
        this.x = this.x + 50;
    }
    if (direction === 'up') {
        this.y = this.y - 50;
    }
    if (direction === 'down') {
        this.y = this.y + 50;
        console.log(this.y);
    }
};

Player.prototype.checkBoundaries = function () {
    // console.log(this.y, this.x);
    if (this.y <= 2) {
        this.y += 5;
    }
    if (this.y >= 450) {
        this.y -= 5;
    }
    if (this.x <= -20) {
        this.x += 5;
    }
    if (this.x >= 425) {
        this.x -= 5;
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
            // collision detected!
            // alert ("collision");
            this.y = 440;
            this.x = 200;
            this.score.updateScore();
        }
    }, this);
};

Player.prototype.winGame = function() {
    if (this.y < 5){
        console.log("win");
        updateScore();
        // winModal.style.display = "flex";
    }
};

Player.prototype.startGame = function(){
    this.x = 200;
    this.y = 440;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(100, 225), new Enemy(0, 150), new Enemy(50, 65)];

var score = new Score();
var player = new Player(score);


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

playAgain.on('click', function () {
    winModal.style.display = "none";
    player.startGame();
});

closeButton.on('click', function () {
    winModal.style.display = "none";
    // looseModal.style.display = "none";
    player.startGame();
});


// function updateScore() {
//     var score = 100;
//     $(".score").append(score);
// }

$(".score").append(100);
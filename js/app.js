//Score Object

// sets initial score to 500
var Score = function () {
    this.score = 500;
};

//appends score to html when game starts/restart
//empties the html so that the score is cleared and new score is added
Score.prototype.displayScore = function () {
    $(".score").empty().append(this.score);
};

//increases the score by 100 when sprite reaches water
Score.prototype.earnPoints = function () {
    this.score += 100;
};

// decreases the points by 100 when sprite get hits by bug
Score.prototype.loosePoints = function () {
    this.score -= 100;

};

//resets the score to 500
Score.prototype.reset = function () {
    this.score = 500;
    this.displayScore();
};

// win modal pops up when the score is 1000
Score.prototype.win = function () {
    if (this.score === 700) {
        console.log("win", this);
        $(".modal-title").empty().append("Congratulations!");
        $(".modal-body").empty().append("<p>You Win!</p>");
        $("#myModal").modal("show");

        var scope = this;
        $("#play-again").on('click', function () {
            console.log("button", this);
            scope.reset();
        });
    }
};

//loose modal pops up when score reaches 0
Score.prototype.loose = function () {
    if (this.score === 300) {
        console.log("loose:", this);
        $(".modal-title").empty().append("Sorry!");
        $(".modal-body").empty().append("<p>You Loose!</p>");
        $("#myModal").modal("show");

        var scope = this;
        $("#play-again").on('click', function () {
            scope.reset();
        });
    }
};

//Enemy Object

// Enemies our player must avoid
var Enemy = function (x, y, score) {
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
    this.score = score;
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
    // drawBox(this.x, this.y + 77, 100, 67, "yellow");
};

Enemy.prototype.stopBugs = function () {
    this.speed = 0;
};

//Player Class

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (score, enemies) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.w = 65;
    this.h = 75;
    this.score = score;
    this.enemies = enemies;
};

Player.prototype.update = function () {
    player.collision();
    player.checkBoundaries();
    player.hitWater();
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
        // console.log(this.y);
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
    // console.log(allEnemies);
    // var scope = this;
    allEnemies.forEach(function (enemy) {
        // console.log("scope", scope);
        // console.log("this", this);
        if (this.x < enemy.x + enemy.w &&
            this.x + this.w > enemy.x &&
            this.y < enemy.y + enemy.h &&
            this.h + this.y > enemy.y) {
            // subtract points when hit and display score
            this.score.loosePoints();
            this.score.displayScore();

            //sprite goes to start position
            this.startPosition();

            // points = 0, loose game modal
            this.score.loose();

            // bugs stop moving
            this.looseGame();
        }
    }, this);
};

// //sets starting position for player
Player.prototype.startPosition = function () {
    this.x = 200;
    this.y = 400;
};

Player.prototype.hitWater = function () {
    if (this.y < 50) {
        this.score.earnPoints();
        this.score.displayScore();

        this.startPosition();
        // this.score.win();
        this.winGame();
    }
};

Player.prototype.winGame = function () {
    this.score.win();
    // this.enemy.speed = 0;
    // this.enemies.forEach(function (enemy) {
    //     enemy.stopBugs();
    // });
};

Player.prototype.looseGame = function () {
    this.score.loose();
    // this.enemy.speed = 0;
    // this.enemies.forEach(function (enemy) {
    //     enemy.stopBugs();
    // });
};

// Player.prototype.stopBugs = function () {
//     this.enemy.speed = 0;
// };


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = ([new Enemy(100, 220), new Enemy(0, 140), new Enemy(50, 58)]);

var score = new Score();
var player = new Player(score, allEnemies);
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


//


//extras

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

function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

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


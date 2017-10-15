// Global variables.
// Game score
var score = 0;
var level = 1;
var increment = 5;
var spanScore = document.getElementById("score_id");

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.speed = Math.floor((Math.random() * 100) + 50);
};

// Used to Reset the game at the beginning and after the player dies.
function resetGame() {
    score = 0;
    level = 1;
    increment = 5;
    allEnemies = [];
    allEnemies.push(new Enemy(-100, 65));
    allEnemies.push(new Enemy(-200, 150));
    allEnemies.push(new Enemy(-300, 230));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -200
    }
// Checks if bug hits player
    if(player.x >= this.x - 40 && player.x <= this.x + 40){
        if(player.y >= this.y - 40 && player.y <= this.y + 40){
            player.die();
            resetGame();
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};
// Player prototype
Player.prototype.update = function () {
    if (this.key === 'left' && this.x > 0) {
        this.x = this.x - 50;
        score += 1;
    } else if (this.key === 'up' && this.y > 0) {
        this.y = this.y - 50;
        score += 2;
    } else if (this.key === 'right' && this.x < 400) {
        this.x = this.x + 50;
        score += 1;
    } else if (this.key === 'down' && this.y < 400) {
        this.y = this.y + 50;
        score += 3;
    }
    this.key = null;

    if (this.y < 50) {
        this.x = 200;
        this.y = 400;
        var lane = 0;
        switch (Math.floor(Math.random() * 3) + 1) {
            case 1:
                lane = 65;
                break;
            case 2:
                lane = 150;
                break;
            case 3:
                lane = 230;
                break;

        }
        allEnemies.push(new Enemy(-300, lane));
        score += increment * level;
        level++;
        spanScore.innerHTML = score;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

Player.prototype.handleInput = function (e) {
    this.key  = e;
};
Player.prototype.die = function () {
    this.x = 200;
    this.y = 400;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Enemies created here:
resetGame();

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// ENEMIES
var Enemy = function(x,y, speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-astroid.png';
    this.height = 35;
    this.width = 95;
    this.speed = 100;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > ctx.canvas.width + this.width) {
        this.x = this.speed * Math.floor(Math.random() * 3) + 1;
    } else {
        this.x += this.speed * dt;
    }
    collisionCheck(this);
};


var collisionCheck = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
        console.log('collided');
        player.x = 202;
        player.y = 383;
    }

    // check for player reaching top of canvas and winning the game

    if (player.y + 63 <= 0) {
        player.x = 202;
        player.y = 383;
    }

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402) {
        player.x = 402;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};


// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-astro.png';
    this.height = 60;
    this.width = 65;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
    const horz = 101;
    const vert = 83;

    if (direction === 'left' && this.x - horz >= 0){
        this.x -= horz;
    } else if (direction === 'right' && this.x + horz < ctx.canvas.width){
        this.x += horz;
    //check if player is at top/winner
    } else if (direction === 'up' && this.y - vert >= -vert) {
        this.y -= vert;
        if (this.y <= 15) {
            modal.style.display = "block";
        }
    } else if (direction === 'down' && this.y + vert < ctx.canvas.height -200){
        this.y += vert;
    }
};

const enemyStart = [55, 140, 230];
const player = new Player(202, 400);
let allEnemies = enemyStart.map((y, index) => {
    return new Enemy((-250 * (index +1)), y);
});

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


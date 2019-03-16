// ENEMIES
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-astroid.png';
    this.height = 65;
    this.width = 95;
    this.collision = false;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > ctx.canvas.width + this.width){
        this.x = -250 * Math.floor(Math.random() * 3) + 1;
    } else {
        this.x += 250 * dt;
    }

    //collision
    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        this.collision = true;
            if (player) {
                player.x = 202;
                player.y = 400;
            }
    } else {
        this.collision = false;
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
    this.height = 75;
    this.width = 65;
};

Player.prototype.update = function(dt) {
    if (game && player.y === -15) {
        game = false;
        winner();
    }
};

// Draw the enemy on the screen
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

    } else if (direction === 'up' && this.y - vert >= -vert) {
        this.y -= vert;

    } else if (direction === 'down' && this.y + vert < ctx.canvas.height -150){
        this.y += vert;
    }
};

var game = true;
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

//collision
function collision(px, py, ph, pw, ex, ey, eh, ew) {
    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh)
}

//show winning modal
function winner () {
    $("#winner").modal('show');
}

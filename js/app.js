// Entity class for both player and enemis to 
class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 205;
        this.y = 430;
        // this.width = 100;
        // this.height = 100;
    }
    
    // Check for collisions.
    checkCollisions() {
       for (i = 0; i < allEnemies.length; i++) {
           if (player.x < allEnemies[i].x + allEnemies[i].width/2 &&
            player.x + player.width/2 > allEnemies[i].x && 
            player.y < allEnemies[i].y + allEnemies[i].height/2 && 
            player.height/2 + player.y > allEnemies[i].y){
                console.log('ouch!')
                player.x = 205;
                player.y = 430;
            }
       }

    }

    // Make enemies show up on the board 
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Entity{
    constructor(x, y) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = 101;
        this.board = this.speed * 5;
        this.width = 50;
        this.height = 50;
    }

    // Update enemis position
    update(dt){
        if (this.x < this.board) {
            this.x += 150 * dt;
        }
        else{
            this.x =- this.speed;
        }
    }

};

// Now write your own player class
class Player extends Entity {
    constructor(){
        super();
        this.sprite += 'char-boy.png'
        this.height = 50;
        this.width = 50;
    }

    // Udate the player's position
    update(dt) {
        this.speed * dt;

        if (this.y < 20) {
            this.x = 205;
            this.y = 420;
        }
    }

    // Move Player
    handleInput(allowedKeys) {
     
        if (allowedKeys === 'left' && this.x > 5){
            this.x -= 100;
        }else if (allowedKeys === 'right' && this.x < 405){
            this.x += 100;
        } else if (allowedKeys === 'up' && this.y > 20) {
            this.y -= 99;
        }else if (allowedKeys === 'down' && this.y < 400) {
            this.y += 100;
       }
       console.log(this.x, this.y);
    }

    
};

// Now instantiate your objects.
const player = new Player();
const bug1= new Enemy(-101, 55);
const bug2 = new Enemy((-101 * 3), 133);
const bug3 = new Enemy(-101 *5, 225);

// Place all enemy objects in an array called allEnemies
let allEnemies = [bug1, bug2, bug3];


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

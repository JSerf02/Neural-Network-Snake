//Snake (player)
class Snake {
    //Sets snake's inner variables
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.startx = x;
        this.starty = y;
        this.width = 20;
        this.height = 20;
        this.body = [[this.x, this.y]];
        this.bodyIter = [];
        this.onWall = false;
        this.onFruit = false;

    }
    //Respawns the snake upon death
    die() {
        this.x = this.startx;
        this.y = this.starty
        this.body = [[this.x, this.y]];
        this.bodyIter = [];
        direction = 1;
        score = 0;
        
        fruits[0].x = randomNumber(2, (window.innerWidth - 40) / 20) * 20;
        fruits[0].y = randomNumber(2, (window.innerHeight - 40) / 20) * 20;
        start = false;
        for (element of elements) {
            element.style.display = "inline";
        }
        direction = down;
            
        


    }
    //Draws the snake on the canvas different colors correspond to hitboxes (navy = no hitbox, blue = head, black = hitbox)
    draw() {
        for (let i = 0; i < this.body.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = 'rgb(' + 13*i + ', ' + 5*i + ', ' + (200 - i) + ')';
            ctx.rect(this.body[i][0], this.body[i][1], this.width, this.height);
            ctx.fill();
        }
    }
    //Function to move the snake and to check collision
    update() {
        this.x = this.body[0][0];
        this.y = this.body[0][1];

        //Checks fruit collision
        this.onFruit = false;
        for (let i = 0; i < fruits.length; i++) {
            let c = collision(snake, fruits[i]);
            if (c == true) {
                this.onFruit = c;
                break;
            }
        }
        //Moves snake if no fruit collision
        if (this.onFruit == false) {
            this.bodyIter = [];
            if (direction == up) {
                this.bodyIter.push([this.body[0][0], this.body[0][1] - speed]);
            }
            else if (direction == left) {
                this.bodyIter.push([this.body[0][0] - speed, this.body[0][1]]);
            }
            else if (direction == down) {
                this.bodyIter.push([this.body[0][0], this.body[0][1] + speed]);
            }
            else if (direction == right) {
                this.bodyIter.push([this.body[0][0] + speed, this.body[0][1]]);
            }
            if (extend == 0) {
                for (let i = 0; i < this.body.length - 1; i++) {
                    this.bodyIter.push([this.body[i][0], this.body[i][1]]);
                }
            }
            else {
                for (let i = 0; i < this.body.length; i++) {
                    this.bodyIter.push([this.body[i][0], this.body[i][1]]);
                }
                extend--;
            }
            this.body = [];
            this.body = this.bodyIter;


        }
        //Increases score, moves snake, and increases size upon fruit collision. Also respawns the fruit.
        else {
            score++;
            if (aiPlay && score > bobScore) {
                bobScore++;
            }
            else if (!aiPlay && score > highScore) {
                highScore++;
            }
            this.bodyIter = [];
            if (direction == up) {
                this.bodyIter.push([this.body[0][0], this.body[0][1] - speed]);
            }
            else if (direction == left) {
                this.bodyIter.push([this.body[0][0] - speed, this.body[0][1]]);
            }
            else if (direction == down) {
                this.bodyIter.push([this.body[0][0], this.body[0][1] + speed]);
            }
            else if (direction == right) {
                this.bodyIter.push([this.body[0][0] + speed, this.body[0][1]]);
            }
            for (let i = 0; i < this.body.length; i++) {
                this.bodyIter.push([this.body[i][0], this.body[i][1]]);
            }
            this.body = this.bodyIter;
            noFruit = true;
            while (noFruit == true) {
                fruits[0].x = randomNumber(2, (window.innerWidth - 40)/20) * 20;
                fruits[0].y = randomNumber(2, (window.innerHeight - 40)/20) * 20;
                if (snake.body.includes(fruits[0]) == false) {
                    noFruit = false;
                }
            }

        }
        //Ignore everything aboutprevDirection and turnCount. That's there in case I decide to improve the hitbox system eventually.
        if (direction != prevDirection) {
            turnCount++;
        }
        else if (turnCount > 0 && turnCount < 12) {
            turnCount++;
        }
        else {
            turnCount = 0;
        }
        /* Checks collision between head and body of snake
         * Starts at the 10th position of the body because the squares of the snake's body overlap when the snake turns which causes death when
         * there shouldn't be any death. I may fix this later by making the hitboxes of the earlier tiles of the snake's body smaller than the
         * tiles are on screen so they also work with turning.
         */
        this.x = this.body[0][0];
        this.y = this.body[0][1];
        /*if (turnCount > 0) {
            for (let i = 1; i < this.body.length; i++) {
                let c = new Wall(this.body[i][0], this.body[i][1], 20, 20);
                a = new Wall(this.body[0][0], this.body[0][1], 20, 20);
                let d = collision(a, c);
                if (d == true) {
                    this.die();
                }
            }
        }
        else {
            for (let i = 1; i < this.body.length; i++) {
                let c = new Wall(this.body[i][0], this.body[i][1], 20, 20);
                a = new Wall(this.body[0][0], this.body[0][1], 20, 20);
                let d = collision(a, c);
                if (d == true) {
                    this.die();
                }
            }
        }*/
        for (let i = 1; i < this.body.length; i++) {
            let c = new Wall(this.body[i][0], this.body[i][1], 20, 20);
            a = new Wall(this.body[0][0], this.body[0][1], 20, 20);
            let d = collision(a, c);
            if (d == true) {
                this.die();
            }
        }

        //Checks wall collision
        this.onWall = false;
        for (let i = 0; i < walls.length; i++) {
            this.onWall = collision(snake, walls[i]);
            if (this.onWall == true) {
                this.die();
                break;
            }
        }
        prevDirection = direction;
    }
}
//Class for everything that isn't a snake. I usually start all games like this, which is why Im using the class. It really isn't necessary but whatever.
class Object {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}
//Wall class
class Wall extends Object {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }
    //Draws the wall on the canvas
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}
//Fruit class
class Fruit extends Object {
    constructor(x, y) {
        super(x, y);
        this.drawX = this.x + 10;
        this.drawY = this.y + 10;

        this.width = 20;
        this.height = 20;
    }
    //Draws the fruit on the canvas
    draw() {
        this.drawX = this.x + 10;
        this.drawY = this.y + 10;
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.drawX, this.drawY, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}
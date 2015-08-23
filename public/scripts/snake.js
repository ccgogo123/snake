/**
 * Created by christopherhuang on 8/23/15.
 */
function Snake(board) {
    this.height = 10;
    this.width = 10;
    this.color = 'red';
    this.board = board;
    this.body = [];

    this.addEventListener();
    this.init();
}

Snake.prototype.init = function() {
    this.body = [];
    this.body.push({x : 0, y : 0});
    this.direction = 'Right';
    this.speed = 1;
}

Snake.prototype.draw = function(canvas) {
    var context = canvas.getContext('2d');
    context.fillStyle = this.board.backgroundColor;
    context.fillRect(0, 0, this.board.height, this.board.width);
    context.fillStyle = this.color;
    this.body.forEach(function(cell) {
        context.fillRect(cell.x, cell.y, this.height, this.width);
    }, this);
}

Snake.prototype.move = function() {
    var head = {x : this.body[0].x,
                y : this.body[0].y};

    switch (this.direction) {
        case 'Right':
            head.x += this.speed;
            break;
        case 'Left':
            head.x -= this.speed;
            break;
        case 'Up':
            head.y -= this.speed;
            break;
        case 'Down':
            head.y += this.speed;
            break;
    }
    if (this.hasCollision(head)) {
        return this.init();
    }
    this.body.unshift(head);
    this.body.pop();
}

Snake.prototype.addEventListener = function() {
    var snake = this;
    document.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case 37:
                //Left
                if (snake.direction != 'Right') {
                    snake.direction = 'Left';
                }
                break;
            case 39:
                //Right
                if (snake.direction != 'Left') {
                    snake.direction = 'Right';
                }
                break;
            case 38:
                //Up
                if (snake.direction != 'Down') {
                    snake.direction = 'Up';
                }
                break;
            case 40:
                //Down
                if (snake.direction != 'Up') {
                    snake.direction = 'Down';
                }
                break;
        }
    });
}

Snake.prototype.hasCollision = function(head) {
    if (head.x < 0 || head.x + this.width >= this.board.width ||
        head.y < 0 || head.y + this.height >= this.board.height) {
        return true;
    }
    return false;
}

Snake.prototype.generateFood = function() {

}

function Board(canvas) {
    this.height = canvas.height;
    this.width = canvas.width;
    this.backgroundColor = 'white';
}

var canvas = document.getElementById('canvas');
var snake = new Snake(new Board(canvas));
window.setInterval(function() {
    snake.move();
    snake.draw(canvas);
}, 20);
/**
 * Created by christopherhuang on 8/25/15.
 */
/**
 * Game class used to control the game loop
 * @constructor
 */
function Game() {
}

/**
 * Game entrance
 */
Game.prototype.gameLoop = function() {
    this.init();
    if (id) window.clearInterval(id);
    id = window.setInterval(this.draw, 60);
}

/**
 * Initialize the game settings
 */
Game.prototype.init = function() {
    snake = new Snake(10, 10, 'black', 'right', 10);
    board = new Board(canvas.height, canvas.width, 'blue');
    foodFactory = new FoodFactory(board, 10, 10, 'yellow');
    food = foodFactory.generateFood();

}

/**
 * draw the objects in the board
 * @param snake
 * @param board
 * @param food
 */
Game.prototype.draw = function() {
    snake.move();
    var context = canvas.getContext('2d');
    context.fillStyle = board.color;
    context.fillRect(0, 0, board.height, board.width);
    context.fillStyle = snake.color;
    snake.body.forEach(function(cell) {
        context.fillRect(cell.x, cell.y, snake.height, snake.width);
    });
    context.fillStyle = food.color;
    context.fillRect(food.position.x, food.position.y, food.height, food.width);
}

/**
 *
 */
Game.prototype.addEventListener = function () {
    document.addEventListener('keydown', function(e) {
        if (e.keyCode == 37 && snake.direction != 'right') {
            snake.direction = 'left';
        }else if (e.keyCode == 38 && snake.direction != 'down') {
            snake.direction = 'up';
        }else if (e.keyCode == 39 && snake.direction != 'left') {
            snake.direction = 'right';
        }else if (e.keyCode == 40 && snake.direction != 'up') {
            snake.direction = 'down';
        }
    });
}

/**
 * Snake class
 * @param height
 * @param width
 * @param color
 * @param direction
 * @param speed
 * @constructor
 */
function Snake(height, width, color, direction, speed) {
    this.height = height;
    this.width = width;
    this.color = color;
    this.direction = direction;
    this.speed = speed;
    this.body = [{x : 0, y : 0}];
}

/**
 * Update the position of the snake
 */
Snake.prototype.move = function() {
    var cell = {x : this.body[0].x, y : this.body[0].y};
    if (this.direction == 'right') {
        cell.x += this.speed;
    }else if (this.direction == 'left') {
        cell.x -= this.speed;
    }else if (this.direction == 'up') {
        cell.y -= this.speed;
    }else if (this.direction == 'down') {
        cell.y += this.speed;
    }
    snake.body.unshift(cell);
    var tail = snake.body.pop();
    if (this.hasCollision()) {
        return game.gameLoop();
    }
    if (food.hasCollision(snake)) {
        snake.body.push(tail);
        food = foodFactory.generateFood();
    }
}

Snake.prototype.hasCollision = function() {
    var head = this.body[0];

    for (var i = 1; i < this.body.length; i++) {
        if (head.x == this.body[i].x && head.y == this.body[i].y) return true;
    }
    if (head.x < 0 || head.x + this.width > board.width
        || head.y < 0 || head.y + this.height > board.height) {
        return true;
    }
    return false;
}

/**
 * Board class
 * @param height
 * @param width
 * @param color
 * @constructor
 */
function Board(height, width, color) {
    this.height = height;
    this.width = width;
    this.color = color;
}

/**
 * Generate the food on the board
 * @param board
 * @constructor
 */
function FoodFactory(board, height, width, color) {
    this.board = board;
    this.height = height;
    this.width = width;
    this.color = color;
}

FoodFactory.prototype.generateFood = function() {
    var x = this.height * Math.floor(Math.random() * Math.floor(this.board.height / this.height));
    var y = this.width * Math.floor(Math.random() * Math.floor(this.board.width / this.width));
    return new Food(this.height, this.width, this.color, {x : x, y : y});
}

function Food(height, width, color, position) {
    this.height = height;
    this.width = width;
    this.color = color;
    this.position = position;
}

Food.prototype.hasCollision = function(snake) {
    if (this.position.x == snake.body[0].x
        && this.position.y == snake.body[0].y) {
        return true;
    }
    return false;
}

var snake;
var board;
var foodFactory;
var food;
var id;

var canvas = document.getElementById('canvas');
var game = new Game();
game.addEventListener();
game.gameLoop();

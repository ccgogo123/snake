/**
 * Created by christopherhuang on 8/23/15.
 */
function Snake() {
    this.direction = 'Right';
    this.height = 10;
    this.width = 10;
    this.color = 'red';
    this.body = [[0, 0]];
}

Snake.prototype.draw = function(canvas) {
    var context = canvas.getContext('2d');
    context.fillStyle = this.color;
    this.body.forEach(function(cell) {
        context.fillRect(cell[0], cell[1], this.height, this.width);
    }, this);
}

var canvas = document.getElementById('canvas');
new Snake().draw(canvas);
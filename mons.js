function Monster(x, y) {
  this.x = x;
  this.y = y;
  this.move = function() {
    this.x += 0.1;
    this.y += 0.1;
  }
  this.show = function () {
    fill(0, 255, 0, 200);
    rect(this.x, this.y, 20, 20);
  };
}

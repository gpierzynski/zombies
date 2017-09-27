function Player(x, y) {
  this.x = x;
  this.y = y;
  this.move = function (direction) {
      //right
      if (direction == 1 && this.x <= 895)
        this.x += 5;
      //down
      if (direction == 2 && this.y <= 555)
        this.y += 5;
      //left
      if (direction == 3 && this.x >= 185)
        this.x -= 5;
      //up
      if (direction == 4 && this.y >= 95)
        this.y -= 5;
  };
  this.show = function () {
    //green color
    fill(0, 255, 0, 200);
    //player is a 20x20 square
    rect(this.x, this.y, 20, 20);
  };
}

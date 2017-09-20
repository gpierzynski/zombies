function House(x, y) {
  this.x = x;
  this.y = y;
  this.show = function () {
    //wall of the house
    fill(204, 102, 0);
    rect(this.x, this.y, 750, 500);
    //inside of the house
    fill(162, 172, 188);
    rect(this.x + 5, this.y + 5, 740, 490);
  };
}

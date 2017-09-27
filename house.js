function House(x, y) {
  this.outerX = x;
  this.outerY = y;
  this.outerWidth = 750;
  this.outerHeight = 500;
  this.innerX = x + 5;
  this.innerY = y + 5;
  this.innerWidth = this.outerWidth - 10;
  this.innerHeight = this.outerHeight - 10;
  this.show = function () {
    //wall of the house
    fill(204, 102, 0);
    rect(this.outerX, this.outerY, this.outerWidth, this.outerHeight);
    //inside of the house
    fill(162, 172, 188);
    rect(this.innerX, this.innerY, this.innerWidth, this.innerHeight);
  };
}

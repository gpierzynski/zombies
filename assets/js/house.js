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
    fill(219, 224, 168);
    rect(this.outerX, this.outerY, this.outerWidth, this.outerHeight, 8);
    //inside of the house
    fill(138, 140, 123);
    rect(this.innerX, this.innerY, this.innerWidth, this.innerHeight);
  };
}

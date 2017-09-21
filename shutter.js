function Shutter(x, y, h, w) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  //this.durability = 100;
  this.show = function () {
    fill(0, 255, 0, 200);
    rect(this.x, this.y, this.h, this.w);
  };
}

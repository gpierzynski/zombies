function Shutter(x, y, h, w, cx, cy, ch, cw) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.centerX = cx;
  this.centerY = cy;
  this.centerH = ch;
  this.centerW = cw;
  this.broken = false;
  this.r = 99;
  this.g = 73;
  this.b = 25;
  this.breakApart = function() {
    this.broken = true;
    this.r = 135;
    this.g = 181;
    this.b = 255;
  }
  this.show = function () {
    fill(this.r, this.g, this.b, 200);
    rect(this.x, this.y, this.h, this.w);
    fill(2, 2, 2);
    rect(this.centerX, this.centerY, this.centerH, this.centerW);
  };
}

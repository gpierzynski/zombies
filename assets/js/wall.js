function Wall(x, y, w, h){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.r = 219;
  this.b = 224;
  this.g = 168;
  this.show = function() {
    fill(this.r, this.b, this.g);
    rect(this.x, this.y, this.w, this.h);
  }
}

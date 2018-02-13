function Furniture(img, x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.tiles = new Map();
  this.img = img;
  this.show = function() {
    image(this.img, this.x, this.y, this.w, this.h);
  }
}

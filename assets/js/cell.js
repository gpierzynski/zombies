function Cell(x, y, position){
  this.x = x;
  this.y = y;
  this.w = 20;
  this.h = 20;
  this.d = 0;
  this.position = position;
  this.wall = false;
  this.visited = false;
  this.parent = this;
  this.direction = 0;
  this.adjacent = new Array();
  this.re_init = function(){
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.d = 0;
    this.position = position;
    this.wall = false;
    this.visited = false;
    this.parent = this;
    this.direction = 0;
    while(this.adjacent.length > 0)
      this.adjacent.pop();
  }
  this.getLeft = function(){
    //bounds check
    if (this.position % 55 == 0){
      //console.log("getLeft is returning null at position: " + this.position);
      return null;
    }
    //collision check
    if (wallCollision(this.x, this.y, this.w, this.h) != null || furnitureCollision(this.x, this.y, this.w, this.h) != null) {
      this.wall = true;
      return null;
    }
    return this.position - 1;
  }
  this.getRight = function(){
    if ( (this.position + 1) % 55 == 0 ){
      return null;
    }
    if (wallCollision(this.x, this.y, this.w, this.h) != null || furnitureCollision(this.x, this.y, this.w, this.h) != null) {
      this.wall = true;
      return null;
    }
    return this.position + 1;
  }
  this.getTop = function() {
    if(this.position < 55){
      return null;
    }
    if (wallCollision(this.x, this.y, this.w, this.h) != null || furnitureCollision(this.x, this.y, this.w, this.h) != null) {
      //console.log("step " + this.d + " collided");
      this.wall = true;
      return null;
    }
    return this.position - 55;
  }
  this.getBottom = function() {
    if(this.position > 1759){
      return null;
    }
    if (wallCollision(this.x, this.y, this.w, this.h) != null || furnitureCollision(this.x, this.y, this.w, this.h) != null) {
      this.wall = true;
      return null;
    }
    return this.position + 55;
  }
  this.getDirection = function() {
    lowest_neighbor = this.parent.position;
    //console.log("lowest_neighbor distance: " + lowest_neighbor.d);
    if (lowest_neighbor - 1 == this.position)
      return 1;
    if (lowest_neighbor + 1 == this.position)
      return 2;
    if (lowest_neighbor - 55 == this.position)
      return 3;
    if (lowest_neighbor + 55 == this.position)
      return 4;
  }
  this.getAdjacent = function() {
    if(this.getLeft() != null && !grid.get(this.getLeft()).visited)
      this.adjacent.push(this.getLeft());
    if(this.getRight() != null && !grid.get(this.getRight()).visited)
      this.adjacent.push(this.getRight());
    if(this.getTop() != null && !grid.get(this.getTop()).visited)
      this.adjacent.push(this.getTop());
    if(this.getBottom() != null && !grid.get(this.getBottom()).visited)
      this.adjacent.push(this.getBottom());
  }
  this.update = function(parent) {
    this.parent = parent;
    //console.log("updating cell " + this.position);
    if(parent.d <= this.d || this.d == 0)
      this.d = parent.d + 1;
    //console.log("this distance is: " + this.d);
  }
  this.show = function(){
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
    fill(94, 0, 0);
    text(this.d, this.x, this.y, this.w, this.h);
  }
}

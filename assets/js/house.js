function House(x, y) {
  this.outerX = x;
  this.outerY = y;
  this.outerWidth = 750;
  this.outerHeight = 500;
  this.innerX = x + 5;
  this.innerY = y + 5;
  this.innerWidth = this.outerWidth - 10;
  this.innerHeight = this.outerHeight - 10;
  this.x = x;
  this.y = y;
  this.walls = new Map();
  this.furniture = new Map();
  this.init = function() {
    //Initialize walls
    //top outer wall
    this.walls.set(0, new Wall(this.x, this.y, 750, 5));
    //left outer wall
    this.walls.set(1, new Wall(this.x, this.y, 5, 500));
    //right outer wall
    this.walls.set(2, new Wall(this.x + 745, this.y, 5, 500));
    //bottom outer wall
    this.walls.set(3, new Wall(this.x, this.y + 495, 750, 5));
    //bottom bedroom wall
    this.walls.set(4, new Wall(180, 270, 210, 5));
    //upper right bedroom wall
    this.walls.set(5, new Wall(385, 250, 5, 25));
    //lower right bedroom wall
    this.walls.set(6, new Wall(385, 85, 5, 105));

    //Initialize shutters
    //left
    shutters.set(0, new Shutter(175, 305, 5, 40, 175, 323, 5, 5));
    //upper
    shutters.set(1, new Shutter(540, 85, 40, 5, 558, 85, 5, 5));
    //right
    shutters.set(2, new Shutter(920, 305, 5, 40, 920, 323, 5, 5));
    //lower
    shutters.set(3, new Shutter(540, 580, 40, 5, 558, 580, 5, 5));

    //Initialize furniture
    //bed
    this.furniture.set(0, new Furniture(bed_img, 180, 90, 80, 50));
    //top countertop
    this.furniture.set(1, new Furniture(counter1, 680, 90, 240, 30));
    // right countertop
    this.furniture.set(2, new Furniture(counter2, 890, 120, 30, 145));
    // sink
    this.furniture.set(3, new Furniture(sink, 780, 90, 30, 30));
    // horizontal couch
    this.furniture.set(4, new Furniture(horiz_couch, 670, 345, 125, 40));
    // vertical couch
    this.furniture.set(5, new Furniture(vert_couch, 830, 415, 40, 95));
  }

  this.show = function () {

    //floor of the house
    fill(138, 140, 123);
    rect(this.innerX, this.innerY, this.innerWidth, this.innerHeight);
    //kitchen tile
    image(tile_img, 663, 90, 257, 215);
    //living room rug
    fill(112, 84, 25);
    rect(658, 410, 145, 105, 10);

    //show walls
    for (var i = 0; i < this.walls.size; i++) {
      if (this.walls.has(i)){
        this.walls.get(i).show();
      }
    }

    //show shutters
    for (var i = 0; i < shutters.size; i++) {
      if (shutters.has(i)){
        shutters.get(i).show();
      }
    }
    //show furniture
    for (var i = 0; i < this.furniture.size; i++) {
      if (this.furniture.has(i)) {
        this.furniture.get(i).show();
      }
    }
    //fridge
    fill(211, 217, 226);
    rect(680, 90, 35, 30);
    //stove
    fill(58, 58, 58);
    rect(890, 150, 30, 60);
    fill(79, 80, 81, 50);
    ellipse(905, 165, 15, 15);
    ellipse(905, 195, 15, 15);

  };
}

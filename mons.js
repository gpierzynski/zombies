function Monster(x, y) {
  this.x = x;
  this.y = y;
  this.direction = 0;
  this.move = function() {
    console.log("x coordinate is: " + this.x);
    //move toward closest window
    this.whichWindow();
    //this.windowReached();
    //go for player
    //this.toPlayer();
  }

  this.toPlayer = function () {
    //when inside is reached, switch targets
    if (this.x >= 195 && this.x <= 905 && this.y >= 100 && this.y <= 630) {
      this.direction = (this.y - player.y) / (this.x - player.x);
      //equation to go toward window -- y - b = m(x -a)
      this.x += 0.5;
      this.y = this.direction * (this.x - player.x) + player.y;
    }
  }
  this.getDistance = function (num) {
    return Math.sqrt( Math.pow(x - shutters.get(num).x, 2) + Math.pow(y - shutters.get(num).y, 2) );
  }

  this.whichWindow = function () {
    //assume monster is going toward the left window
    distance = this.getDistance(0);
    closest = 0;
    left_to_right = true;
    //if monster is closer to any of the other windows, go to that one
    //using distance formula -- sqrt( (x2 - x1)^2 + (y2 - y1)^2 )
    //upper
    if (this.getDistance(1) < distance) {
      distance = this.getDistance(1);
      closest = 1;
    }
    //right
    if (this.getDistance(2) < distance) {
      distance = this.getDistance(2);
      closest = 2;
    }
    //lower
    if (this.getDistance(3) < distance)
      closest = 3;

    if (x > shutters.get(closest).x)
      left_to_right = false;

    this.toWindow(closest, left_to_right);
  }
  //parameters are dimensions of object colliding with monster
  this.collide = function (x, y, w, h) {
    if(this.x + 20 >= x &&
      this.x <= x + w &&
      this.y + 20 >= y &&
      this.y <= y + h) {
        return true;
      }
    return false;
  }

  //num specifies the window
  //if monster is moving left to right, x should increase (operator will be +)
  //if monster is moving right to left, x should decrease (operator will be -)
  this.toWindow = function (num, left_to_right) {
    //if monster collides with the walls of the house, move to window
    if (this.collide(house.outerX, house.outerY, house.outerWidth, house.outerHeight)) {
      if(this.collide(shutters.get(num).x, shutters.get(num).y, shutters.get(num).w, shutters.get(num).h)){
        //console.log("colliding with shutter");
        return;
      }
      else if( (this.x == 155 || this.x == 925) && left_to_right){
        console.log("moving down");
        this.y += 0.5;
      }
      else if( (this.x == 155 || this.x == 925) && !left_to_right){
        console.log("moving up");
        this.y -= 0.5;
      }
      else if( (this.y == 65 || this.y == 580) && left_to_right){
        console.log("moving right")
        this.x += 0.5;
      }
      else if( (this.y == 65 || this.y == 580) && !left_to_right){
        console.log("moving left");
        this.x -= 0.5;
      }
      //console.log("monster x: " + this.x);
      //console.log("shutter x: " + shutters.get(num).x);
    }
    else {
      if (this.x < shutters.get(num).x)
        this.x += 1;
      else if (this.x > shutters.get(num).x)
        this.x -= 1;
      if(this.y < shutters.get(num).y)
        this.y += 1;
      else if (this.y > shutters.get(num).y)
        this.y -= 1;
    }

  }
  this.show = function () {
    fill(0, 255, 0, 200);
    rect(this.x, this.y, 20, 20);
  };
}

function Monster(x, y) {
  this.x = x;
  this.y = y;
  this.direction = 0;
  this.move = function() {
    console.log("y coordinate is: " + this.y);
    //move toward closest window
    this.whichWindow();
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
        return;
      }
      // if player is against left/right wall, move up or down to get to left/right window
      if (this.x == 155 && num == 0 && this.y < shutters.get(0).y ||
         this.x == 925 && num == 2 && this.y < shutters.get(2).y)
        this.y += 1;
      else if (this.x == 155 && num == 0 && shutters.get(0).y < this.y ||
               this.x == 925 && num == 2 && shutters.get(2).y < this.y)
        this.y -= 1;
      //if player is against top wall and trying to go to
      if( (this.y == 65 && num == 1 && this.x < shutters.get(1).x) ||
          ((this.y == 65 || this.y == 585) && num == 2) ||
          (this.y == 585 && num == 3 && this.x < this.shutters.get(3).x))
        this.x += 1;
      else if( (this.y == 65 && num == 1 && this.x > shutters.get(1).x) ||
          ((this.y == 65 || this.y == 585) && num == 0) ||
          (this.y == 585 && num == 3 && this.x > this.shutters.get(3).x))
        this.x -= 1;
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

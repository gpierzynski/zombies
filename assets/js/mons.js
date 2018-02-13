function Monster(x, y) {
  this.x = x;
  this.y = y;
  this.w = 20;
  this.h = 20;
  this.direction = 0;
  this.target_window = -1;
  this.health = 100;
  this.inside = false;
  this.r = 0;
  this.g = 255;
  this.b = 0;
  this.hit = false;
  this.s = null;
  this.droppedAmmo = false;
  this.ammoTaken = false;
  this.attack_time = null;
  this.collided_with = null;
  this.move = function() {
    this.toWindow(this.target_window);
    if(this.inside){
      if(whichCell(this.x, this.y, this.w, this.h).wall || whichCell(this.x, this.y, this.w, this.h).d == 0){
        if(this.target_window == 0)
          this.x += 1;
        else if(this.target_window == 1)
          this.y += 1;
        else if(this.target_window == 2)
          this.x -= 1;
        else if(this.target_window == 3)
          this.y -= 1;
      }
      else{
        this.toPlayer();
      }
    }
  }

  this.toPlayer = function () {
    //console.log("moving toward player");
    if (isColliding(this.x, this.y, 20, 20, player.x, player.y, 20, 20)) {
      if (this.s == null)
        this.s = second();
      if (abs(second() - this.s) >= 1) {
        player.react(this.x , this.y);
        this.s = null;
      }
    }
    else if(whichCell(this.x, this.y, this.w, this.h).adjacent.length > 0 && whichCell(this.x, this.y, this.w, this.h).d > 0){
      //console.log("pathfinding");
      mons_location = whichCell(this.x, this.y, this.w, this.h);
      mons_direction = mons_location.getDirection();
      //console.log("direction is: " + mons_direction);
      if(mons_direction == 1)
        this.x += 1;
      else if(mons_direction == 2)
        this.x -= 1;
      else if(mons_direction == 3)
        this.y += 1;
      else if(mons_direction == 4)
        this.y -= 1;
    }
    else {
      //console.log("naive");
      last_x = this.x;
      last_y = this.y;
      if (this.x < player.x) {
        this.collided_with = otherCollision(this.x + 1, this.y, this.w, this.h, this);
        if (this.collided_with == null)
          this.x += 1;
      }
      else if (this.x > player.x) {
        this.collided_with = otherCollision(this.x - 1, this.y, this.w, this.h, this);
        if (this.collided_with == null)
          this.x -= 1;
      }
      if (this.y < player.y) {
        this.collided_with = otherCollision(this.x, this.y + 1, this.w, this.h, this);
        if (this.collided_with == null)
          this.y += 1;
      }
      else if (this.y > player.y) {
        this.collided_with = otherCollision(this.x, this.y - 1, this.w, this.h, this);
        if (this.collided_with == null)
          this.y -= 1;
      }
    }
  }

  this.attackPlayer = function () {
    player.react();
  }

  this.dropAmmo = function () {
    if(!this.ammoTaken && this.droppedAmmo){
      fill(128, 129, 130);
      rect(this.x, this.y, 10, 10);
    }
    if (isColliding(this.x, this.y, this.w, this.h, player.x, player.y, player.w, player.h)){
      if(this.health <= 0 && this.droppedAmmo && !this.ammoTaken){
        this.ammoTaken = true;
        player.ammunition += 10;
      }
    }
  }

  this.getDistance = function (num) {
    return Math.sqrt( Math.pow(x - shutters.get(num).x, 2) + Math.pow(y - shutters.get(num).y, 2) );
  }

  this.whichWindow = function () {
    //assume monster is going toward the left window
    distance = this.getDistance(0);
    closest = 0;
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
    this.target_window = closest;
  }

  this.react = function() {
    this.health -= 25;
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
    if(this.health <= 0){
      mons_down += 1;
      if(Math.floor(Math.random() * 10) > 5)
        this.droppedAmmo = true;
      this.dropAmmo();
    }
  }

  this.attackShutter = function(num) {
    if(this.attack_time == null){
      this.attack_time = second();
    }
    if(abs(second() - this.attack_time) >= 5){
      shutters.get(num).breakApart();
    }
  }

  this.shutterCollide = function(num) {
    return (isColliding(this.x, this.y, this.w, this.h, shutters.get(num).centerX, shutters.get(num).centerY, shutters.get(num).centerW, shutters.get(num).centerH))
  }

  //num specifies the window
  //if monster is moving left to right, x should increase (operator will be +)
  //if monster is moving right to left, x should decrease (operator will be -)
  this.toWindow = function (num) {
    //if monster collides with the walls of the house, move to window
    if (isColliding(this.x, this.y, this.w, this.h, house.outerX, house.outerY, house.outerWidth, house.outerHeight)) {
      //when colliding with target shutter
      if(this.shutterCollide(num)){
        //if it is not broken, attack it
        if(!shutters.get(num).broken)
          this.attackShutter(num);
        if(shutters.get(num).broken)
            this.inside = true;
        return;
      }
      // if player is against left/right wall, move up or down to get to left/right window
      if (this.x == 155 && num == 0 && this.y < shutters.get(0).y ||
         this.x == 925 && num == 2 && this.y < shutters.get(2).y)
        this.y += 1;
      else if (this.x == 155 && num == 0 && shutters.get(0).y < this.y ||
               this.x == 925 && num == 2 && shutters.get(2).y < this.y)
        this.y -= 1;
      //if player is against top/bottom wall and trying to go to top/bottom window
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
  this.show = function (r = this.r, g = this.g, b = this.b) {
    fill(r, g, b);
    if(r == this.r)
      image(monster_img, this.x, this.y, this.w, this.h);
    else
      rect(this.x, this.y, this.w, this.h);
  };
}

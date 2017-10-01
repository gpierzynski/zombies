function Monster(x, y) {
  this.x = x;
  this.y = y;
  this.direction = 0;
  this.target_window = -1;
  this.health = 100;
  this.inside = false;
  this.r = 0;
  this.g = 255;
  this.b = 0;
  this.hit = false;
  this.s = 1000;
  this.droppedAmmo = false;
  this.ammoTaken = false;
  this.move = function() {
    this.toWindow(this.target_window);
    if(this.inside)
      this.toPlayer();
  }

  this.toPlayer = function () {
    if (this.isColliding(player.x, player.y, 20, 20)) {
        this.s += second();
        //console.log(time);
        if (this.s > 1000) {
          player.react(this.x , this.y);
          this.s = 0;
        }
    }
    else{
      if (this.x < player.x && this.x <= 895)
        this.x += 1;
      else if (this.x > player.x && this.x >= 185)
        this.x -= 1;
      if(this.y < player.y && this.y <= 555)
        this.y += 1;
      else if (this.y > player.y && this.y >= 95)
        this.y -= 1;
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
    if (this.isColliding(player.x, player.y, 20, 20)){
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
  //parameters are dimensions of object colliding with monster
  this.isColliding = function (x, y, w, h) {
    if(this.x + 20 >= x &&
      this.x <= x + w &&
      this.y + 20 >= y &&
      this.y <= y + h) {
        return true;
      }
    return false;
  }

  this.react = function() {
    this.health -= 25;
    fill(255, 0, 0);
    rect(this.x, this.y, 20, 20);
    if(this.health <= 0){
      mons_down += 1;
      if(Math.floor(Math.random() * 10) > 5)
        this.droppedAmmo = true;
      this.dropAmmo();
    }
    //this.show(255, 0, 0);
  }

  this.attackShutter = function(num) {
    time += second();
    //console.log(time);
    if (time > 15000) {
      shutters.get(num).breakApart();
    }
  }

  this.shutterCollide = function(num) {
    return (this.isColliding(shutters.get(num).centerX, shutters.get(num).centerY, shutters.get(num).centerW, shutters.get(num).centerH))
  }

  this.enterHouse = function(num) {
    if(num == 0)
      this.x += 1;
    else if(num == 1)
      this.y += 1;
    else if(num == 2)
      this.x -= 1;
    else if(num == 3)
      this.y -= 1;
    if(num == 0 && this.x >= 180 ||
       num == 1 && this.y >= 90 ||
       num == 2 && this.x <= 900||
       num == 3 && this.y <= 560)
      this.inside = true;
  }

  //num specifies the window
  //if monster is moving left to right, x should increase (operator will be +)
  //if monster is moving right to left, x should decrease (operator will be -)
  this.toWindow = function (num) {
    //if monster collides with the walls of the house, move to window
    if (this.isColliding(house.outerX, house.outerY, house.outerWidth, house.outerHeight)) {
      if(this.shutterCollide(num)){
        if(!shutters.get(num).broken)
          this.attackShutter(num);
        if(!this.inside && shutters.get(num).broken)
          this.enterHouse(num);
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
  this.show = function (r = this.r, g = this.g, b = this.b) {
    fill(r, g, b);
    if(r == this.r)
      image(monster_img, this.x, this.y, 20, 20);
    else
      rect(this.x, this.y, 20, 20);
  };
}

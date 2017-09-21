function Monster(x, y) {
  this.x = x;
  this.y = y;
  this.direction = 0;
  this.move = function() {
    //move toward closest window
    this.whichWindow();
    //go for player
    this.toPlayer();
  }

  this.toPlayer = function () {
    //when inside is reached, switch targets
    if (this.x >= 170 && this.x <= 90 && this.y >= 70 && this.y <= 570) {
      this.direction = (this.y - player.y) / (this.x - player.x);
      //equation to go toward window -- y - b = m(x -a)
      this.x += 0.5;
      this.y = this.direction * (this.x - player.x) + player.y;
    }
  }

  this.whichWindow = function () {
    //if character spawns left of the house
    if (x < 175) {
      this.toWindow(0, true, false);
    }
    //upper left
    if ( (x >= 175 && y < 80) && (x <= 1100/2) ) {
      this.toWindow(1, true, false);
    }
    //upper right
    if ((x <= 925 && y < 80) && (x > 1100/2) ) {
      this.toWindow(1, false, false);
    }
    //right
    //if character spawns right of the house
    if (x > 925) {
      this.toWindow(2, false, true);
    }
    //lower left
    if ( (x >= 175 && y >= 580) && (x <= 1100/2) ) {
      this.toWindow(3, true, false);
    }
    //lower right
    if ( (x >= 175 && y >= 580) && (x > 1100/2) ) {
      this.toWindow(3, false, false);
    }
  }

  this.toWindow = function (num, operator, slow) {
    //slope formula -- (y2 - y1) / (x2 - x1)
    this.direction = (this.y - shutters.get(num).y) / (this.x - shutters.get(num).x);
    //equation to go toward window -- y - b = m(x -a)
    if (slow)
      this.x -= 0.05;
    else if (operator)
      this.x += 0.5;
    else
      this.x -= 0.5;
    this.y = this.direction * (this.x - shutters.get(num).x) + shutters.get(num).y;
  }
  this.show = function () {
    fill(0, 255, 0, 200);
    rect(this.x, this.y, 20, 20);
  };
}

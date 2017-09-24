function Monster(x, y) {
  this.x = x;
  this.y = y;
  this.direction = 0;
  this.move = function() {
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
    if ( this.getDistance(1) < distance) {
      distance = this.getDistance(1);
      closest = 1;
    }
    //right
    if ( this.getDistance(2) < distance) {
      distance = this.getDistance(2);
      closest = 2;
    }
    //lower
    if ( this.getDistance(3) < distance)
      closest = 3;
    if (x >= 1100/2)
      left_to_right = false;

    this.toWindow(closest, left_to_right);
  }
  //num specifies the window
  //if monster is moving left to right, x should increase (operator will be +)
  //if monster is moving right to left, x should decrease (operator will be -)
  this.toWindow = function (num, l_to_r) {
    //slope formula -- (y2 - y1) / (x2 - x1)
    this.direction = (y - shutters.get(num).y) / (x - shutters.get(num).x);
    if (l_to_r)
      this.x += 0.5;
    else
      this.x -= 0.5;
    //equation to go toward window -- y - b = m(x - a)
    this.y = this.direction * (this.x - shutters.get(num).x) + shutters.get(num).y;
  }
  this.show = function () {
    fill(0, 255, 0, 200);
    rect(this.x, this.y, 20, 20);
  };
}

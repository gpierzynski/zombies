function Player(x, y) {
  this.x = x;
  this.y = y;
  this.w = 20;
  this.h = 20;
  this.fired = new Map();
  this.bullet_num = 0;
  this.ammunition = 25;
  this.health = 100;
  this.right = true;
  this.move = function (direction) {
      //right
      if (direction == 1 && otherCollision(this.x + 5, this.y) == null && !whichCell(this.x + 5, this.y, this.w, this.h).wall)
        this.x += 5;
      //down
      if (direction == 2 && otherCollision(this.x, this.y + 5) == null && !whichCell(this.x, this.y + 5, this.w, this.h).wall)
        this.y += 5;
      //left
      if (direction == 3 && otherCollision(this.x - 5, this.y) == null && !whichCell(this.x - 5, this.y, this.w, this.h).wall)
        this.x -= 5;
      //up
      if (direction == 4 && otherCollision(this.x, this.y - 5) == null && !whichCell(this.x, this.y - 5, this.w, this.h).wall)
        this.y -= 5;
      if(!whichCell(this.x, this.y, this.w, this.h).wall && whichCell(this.x, this.y, this.w, this.h).d != 0)
        grid_steps();
  };
  this.attack = function (prev_x, prev_y, target_x, target_y) {
    if(target_x > this.x)
      this.right = true;
    else
      this.right = false;
    if(this.ammunition > 0){
      this.fired.set(this.bullet_num, new Bullet(prev_x, prev_y, this.x, this.y, target_x, target_y));
      this.bullet_num += 1;
      this.ammunition -= 1;
    }
  }
  this.getDistance = function (num) {
    return Math.sqrt( Math.pow(x - shutters.get(num).x, 2) + Math.pow(y - shutters.get(num).y, 2) );
  }
  this.collidingWindow = function() {
    target_window = -1;
    for (var i = 0; i < shutters.size; i++){
      if (shutters.has(i)){
        if(isColliding(this.x, this.y, this.w, this.h, shutters.get(i).centerX, shutters.get(i).centerY, shutters.get(i).centerW, shutters.get(i).centerH) && shutters.get(i).broken){
          target_window = i;
          console.log("repairing window: " + target_window);
          break;
        }
      }
    }
    return target_window;
  }
  this.repairShutter = function() {
    target_window = this.collidingWindow();
    if(target_window != -1)
      shutters.get(target_window).repair();
  }
  this.react = function() {
    this.health -= 10;
    fill(255, 0, 0);
    rect(this.x, this.y, 20, 20);
  }
  this.show = function () {
    //green color
    fill(133, 172, 234);
    //player is a 20x20 square
    //rect(this.x, this.y, 20, 20);
    if (this.right)
      image(player_right, this.x, this.y, 20, 20);
    else{
      image(player_left, this.x, this.y, 20, 20);
    }

  };
}

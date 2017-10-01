function Player(x, y) {
  this.x = x;
  this.y = y;
  this.fired = new Map();
  this.bullet_num = 0;
  this.ammunition = 25;
  this.health = 100;
  this.move = function (direction) {
      //right
      if (direction == 1 && this.x <= 895)
        this.x += 5;
      //down
      if (direction == 2 && this.y <= 555)
        this.y += 5;
      //left
      if (direction == 3 && this.x >= 185)
        this.x -= 5;
      //up
      if (direction == 4 && this.y >= 95)
        this.y -= 5;
  };
  this.attack = function (prev_x, prev_y, target_x, target_y) {
    if(this.ammunition > 0){
      this.fired.set(this.bullet_num, new Bullet(prev_x, prev_y, target_x, target_y));
      this.bullet_num += 1;
      this.ammunition -= 1;
    }
  }
  this.getDistance = function (num) {
    return Math.sqrt( Math.pow(x - shutters.get(num).x, 2) + Math.pow(y - shutters.get(num).y, 2) );
  }

  this.isColliding = function (x, y, w, h) {
    if(this.x + 20 >= x &&
      this.x <= x + w &&
      this.y + 20 >= y &&
      this.y <= y + h) {
        return true;
      }
    return false;
  }
  this.collidingWindow = function() {
    target_window = -1;
    for (var i = 0; i < shutters.size; i++){
      if (shutters.has(i)){
        if(this.isColliding(shutters.get(i).centerX, shutters.get(i).centerY, shutters.get(i).centerW, shutters.get(i).centerH) && shutters.get(i).broken){
          target_window = i;
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
    image(player_img, this.x, this.y, 20, 20);
  };
}

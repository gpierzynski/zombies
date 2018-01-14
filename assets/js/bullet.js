function Bullet(x, y, origin_x, origin_y, target_x, target_y) {
  this.x = x;
  this.y = y;
  this.origin_x = origin_x;
  this.origin_y = origin_y;
  this.target_x = target_x;
  this.target_y = target_y;
  this.diameter = 3;
  //marks if it is done traveling
  this.done = false;
  this.slope = (this.y - this.target_y) / (this.x - this.target_x + 0.00001)
  //checks collision of circle with rectangular object
  this.collided = function (rx, ry, rw, rh) {
    var testX = this.x;
    var testY = this.y;

    if (this.x < rx)
      testX = rx;
    else if (this.x > rx + rw)
      testX = rx + rw;

    if(this.y < ry)
      testY = ry;
    else if(this.y > ry + rh)
      testY = ry + rh;

    var distance = dist(this.x, this.y, testX, testY);

    if (distance <= this.diameter/2)
      return true;
    return false;
  }

  this.collidedMonster = function(){
    var mons_num = -1;
    for (var i = 0; i < monsters.size; i++){
      if (monsters.has(i)){
        if(this.collided(monsters.get(i).x, monsters.get(i).y, 20, 20) && monsters.get(i).health > 0){
          mons_num = i;
          break;
        }
      }
    }
    return mons_num;
  }

  this.move = function () {
    whichMonster = this.collidedMonster();
    //if bullet collides with wall or monster, return
    if( (whichMonster != -1)) {
      if(!this.done){
        monsters.get(whichMonster).react();
        this.done = true;
      }
      return;
    }
    else{
      rise = Math.abs(this.y - this.target_y);
      run = Math.abs(this.x - this.target_x);
      angle = acos( run / Math.sqrt(rise * rise + run * run) );
      x = 5 * cos(angle);
      y = 5 * sin(angle);
      //target is top right
      if (this.target_x > this.origin_x && this.target_y < this.origin_y)
        y *= -1;
      //target is top left
      else if (this.target_x < this.origin_x && this.target_y < this.origin_y) {
        x *= -1;
        y *= -1;
      }
      //target is bottom left
      else if (this.target_x < this.origin_x && this.target_y > this.origin_y) {
        x *= -1;
      }
      //else target is bottom righht
      this.x += x;
      this.y += y;
    }
  };
  this.show = function () {
    //gray color
    fill(128, 129, 130);
    //fill(0, 255, 0);
    ellipse(this.x, this.y, 5, 5);
  };
}

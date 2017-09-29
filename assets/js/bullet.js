function Bullet(x, y, target_x, target_y) {
  this.x = x;
  this.y = y;
  this.target_x = target_x;
  this.target_y = target_y;
  this.diameter = 3;
  this.done = false;
  this.slope = (this.y - this.target_y) / (this.x - this.target_x + 0.00001)
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
        if(this.collided(monsters.get(i).x, monsters.get(i).y, 20, 20)){
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
      //console.log("slope is: " + slope);
      if ( this.target_x < x)
        this.x -= 10;
      else if( this.target_x > x )
        this.x += 10;
      else{
        return;
      }
      this.y = this.slope * (this.x - x) + y;
    }
  };
  this.show = function () {
    //gray color
    fill(128, 129, 130);
    //fill(0, 255, 0);
    ellipse(this.x, this.y, 5, 5);
  };
}

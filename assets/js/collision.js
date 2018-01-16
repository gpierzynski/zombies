function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
  if(x1 + w1 >= x2 &&
    x1 <= x2 + w2 &&
    y1 + h1 >= y2 &&
    y1 <= y2 + h2) {
      return true;
  }
  return false;
}

function otherCollision (x, y, character = null){
  collided = null;
  //check for collision with monster
  for (var i = 0; i < monsters.size; i++){
    if (monsters.has(i) && monsters.get(i) != character) {
      if(isColliding(x, y, 20, 20, monsters.get(i).x, monsters.get(i).y, 20, 20) && monsters.get(i).health > 0){
        return monsters.get(i);
      }
    }
  }
  //check for collision with walls
  for (var i = 0; i < house.walls.size; i++){
    if (house.walls.has(i)) {
      if(isColliding(x, y, 20, 20, house.walls.get(i).x, house.walls.get(i).y, house.walls.get(i).w, house.walls.get(i).h)){
        return house.walls.get(i);
      }
    }
  }
  //check for collision with furniture
  for (var i = 0; i < house.furniture.size; i++){
    if (house.furniture.has(i)) {
      if(isColliding(x, y, 20, 20, house.furniture.get(i).x, house.furniture.get(i).y, house.furniture.get(i).w, house.furniture.get(i).h)){
        return house.furniture.get(i);
      }
    }
  }
  return collided;
}

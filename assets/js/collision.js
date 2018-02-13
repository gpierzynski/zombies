//checks for collision with other object coordinates specified
function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
  if(x1 + w1 >= x2 &&
    x1 <= x2 + w2 &&
    y1 + h1 >= y2 &&
    y1 <= y2 + h2) {
      return true;
  }
  return false;
}
function monsterCollision(x, y, w, h, character){
  for (var i = 0; i < monsters.size; i++){
    if (monsters.has(i) && monsters.get(i) != character) {
      if(isColliding(x, y, w, h, monsters.get(i).x, monsters.get(i).y, 20, 20) && monsters.get(i).health > 0){
        //console.log("collided with monster");
        return monsters.get(i);
      }
    }
  }
  return null;
}

function wallCollision(x, y, w, h){
  //check for collision with walls
  for (var i = 0; i < house.walls.size; i++){
    if (house.walls.has(i)) {
      if(isColliding(x, y, w, h, house.walls.get(i).x, house.walls.get(i).y, house.walls.get(i).w, house.walls.get(i).h)){
        //console.log("collided with wall");
        return house.walls.get(i);
      }
    }
  }
  return null;
}

function furnitureCollision(x, y, w, h){
  for (var i = 0; i < house.furniture.size; i++){
    if (house.furniture.has(i)) {
      if(isColliding(x, y, w, h, house.furniture.get(i).x, house.furniture.get(i).y, house.furniture.get(i).w, house.furniture.get(i).h)){
        //console.log("collided with furniture");
        return house.furniture.get(i);
      }
    }
  }
}
//checks for object colliding with any other object
function otherCollision (x, y, w = 20, h = 20, character = null){
  //check for collision with monster
  if(monsterCollision(x, y, w, h, character) != null){
    return monsterCollision(x, y, w, h, character);
  }
  if(wallCollision(x, y, w, h) != null){
    return wallCollision(x, y, w, h);
  }
  if(furnitureCollision(x, y, w, h) != null){
    return furnitureCollision(x, y, w, h);
  }
  return null;
}

function whichCell(x, y, w, h){
  for (var i = 0; i < grid.size; i++){
    if (grid.has(i)) {
      if( isColliding(grid.get(i).x, grid.get(i).y, grid.get(i).w, grid.get(i).h, x, y, w, h) ){
        return grid.get(i);
      }
    }
  }
  return null;
}

function grid_steps(){
    //start from player position
    update_grid();
    routes.push(whichCell(player.x, player.y, player.w, player.h));

    for(var i = 0; i < routes.length; i++){
        //create a list of four adjacent cells
        routes[i].getAdjacent();
        //add the cells to the end of the list iff it is not obstructed
        for(var j = 0; j < routes[i].adjacent.length; j++){
          if(!routes[i].visited){
            routes.push( grid.get(routes[i].adjacent[j]) );
            grid.get( routes[i].adjacent[j] ).update(routes[i]);
          }
        }
        routes[i].visited = true;
    }
}

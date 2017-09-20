var canvas;
var player;
var house;
var monster;
var m;
var monsters;
var monster_num;
var x;
var y;  

function setup() {
  canvas = createCanvas(1100, 650);
  centerCanvas();
  player = new Player(1100/2, 650/2);
  monsters = new Map();
  monster_num = 0;
  x = 0;
  y = 0;
  monster = new Monster(x, y);
  monsters.set(monster_num, monster);
  monster_num += 1;
  house = new House(175, 85);
  time = 0;
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  canvas.position(x, 100);
}

function draw() {
  background(0);
  fill(255, 100);
  keys();
  time += 0.01;
  if (time >= 10) {
    x += 40;
    y += 40;
    monsters.set(monster_num, new Monster(x, y));
    monster_num += 1;
    time = 0;
  }
  house.show();
  player.show();
  //monsters.get(0).show();
  //monsters.get(0).move();
  for (var i = 0; i <= monsters.size; i++){
    if (monsters.has(i)){
      monsters.get(i).show();
    }
  }
  for (var i = 0; i <= monsters.size; i++){
    if (monsters.has(i)){
      monsters.get(i).move();
    }
  }
}

function keys() {
  if (keyIsDown(RIGHT_ARROW))
    player.move(1);
  if (keyIsDown(DOWN_ARROW))
    player.move(2);
  if (keyIsDown(LEFT_ARROW))
    player.move(3);
  if (keyIsDown(UP_ARROW))
    player.move(4);
}

var canvas;
var player;
var house;
var monsters;
var shutters;
var monster_num;
var x;
var y;
var time;
var x_min = -20;
var x_max = 1140;
var y_min = -20;
var y_max = 670;
var player_img;
var monster_img;
var text_s = 0;
var mons_down = 0;
var wave_num = 1;

function preload() {
  player_right = loadImage("assets/images/player_right.png");
  player_left = loadImage("assets/images/player_left.png")
  monster_img = loadImage("assets/images/zombie.png");
  tile_img = loadImage("assets/images/tile.png");
  horiz_couch = loadImage("assets/images/couch1.png");
  vert_couch = loadImage("assets/images/couch2.png");
  bed_img = loadImage("assets/images/bed.png");
  counter1 = loadImage("assets/images/counter1.png");
  counter2 = loadImage("assets/images/counter2.png");
  sink = loadImage("assets/images/sink.png");
}

function setup() {
  canvas = createCanvas(1100, 650);
  centerCanvas();
  player = new Player(1100/2, 650/2);
  monsters = new Map();
  shutters = new Map();
  monster_num = 0;
  x = 0;
  y = 0;
  house = new House(175, 85);
  house.init();
  time = null;
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  canvas.position(x, 100);
}

function getRandomX(min, max) {
  return floor(Math.random() * (x_max - x_min) + x_min);
}

function getRandomY(min, max) {
  return floor(Math.random() * (y_max - y_min) + y_min);
}

function spawnMonster() {
  valid_spawn = false;
  //make sure it spawns outside of the house
  while (!valid_spawn) {
    x = getRandomX(x_min, x_max);
    y = getRandomY(y_min, y_max);
    //if its not inside the house, then its okay
    if ( !(x > 0 && x < 1140 && y > 0 && y < 670) ) {
      valid_spawn = true;
    }
  }
  monsters.set(monster_num, new Monster(x, y));
  monsters.get(monster_num).whichWindow();
  monster_num += 1;
  //console.log("monster spawned");
}

function draw() {
  background(82, 89, 7);
  //fill(255, 100);
  //keep an event listener for keyboard input
  //keys();
  if (time == null)
    time = second() % 60;
  //console.log(second());
  if (((second() % 60) - 5) == time) {
    spawnMonster();
    time = null;
  }
  keys();
  house.show();
  if(player.health > 0)
    player.show();
  else{
    quitGame();
  }
  if(monsters.size == 0){
    showWaveNum();
  }
  //displays monsters
  for (var i = 0; i < monsters.size; i++){
    if (monsters.has(i)){
      if(monsters.get(i).health > 0){
        monsters.get(i).show();
        monsters.get(i).move();
      }
      else{
        monsters.get(i).dropAmmo();
      }
    }
  }

  for (var i = 0; i < player.fired.size; i++){
    if (player.fired.has(i)){
      if(!player.fired.get(i).done){
        player.fired.get(i).show();
        player.fired.get(i).move();
      }
    }
  }
  gameInfo();
  healthBar();
  if(mons_down == 15)
    switchWave();
}

function healthBar() {
  textSize(18);
  textFont("Comic Sans MS");
  fill(211, 247, 34);
  text("Health: ", 380, 15);
  fill(255, 0, 0);
  rect(450, 7, 300, 5);
  fill(0, 255, 0);
  rect(450, 7, player.health * 3, 5);
}

function switchWave() {
  noLoop();
  monsters.clear();
  monster_num = 0;
  wave_num += 1;
  mons_down = 0;
  loop();
}

function showWaveNum() {
  textSize(54);
  textFont("Comic Sans MS");
  fill(211, 247, 34);
  text("WAVE " + wave_num, 450, 325);
}

function gameInfo() {
  textSize(18);
  textFont("Comic Sans MS");
  fill(211, 247, 34);
  text("Wave: " + wave_num + "    Zombies killed: " + mons_down, 10, 15);
  textSize(18);
  text("Ammunition: " + player.ammunition, 960, 15);
}

function quitGame() {
  noLoop();
  textSize(54);
  textFont("Comic Sans MS");
  fill(255, 0, 0);
  text("GAME OVER", 400, 325);
  //noLoop();
}

function mouseReleased() {
  console.log("playerx and playery: (" + mouseX + ", " + mouseY + ")");
  player.attack(player.x, player.y, mouseX, mouseY);
  return false;
}

function keys() {
  if (keyIsDown(68))
    player.move(1);
  if (keyIsDown(83))
    player.move(2);
  if (keyIsDown(65))
    player.move(3);
  if (keyIsDown(87))
    player.move(4);
  if (keyIsDown(82))
    player.repairShutter();
}

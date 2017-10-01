# zombies
A 2-D survival game written in JavaScript. The p5.js library is used for most of
 the image processing/drawing.

A link to the p5.js website can be found here: https://p5js.org/

## Basic Idea
The player spawns inside of a house. The windows of the house are boarded up
with shutters. After some time passes, zombies will spawn and walk toward the
house. They will break down the shutters and enter the house. Once they are
inside, they will proceed to chase the player and inflict damage if they collide
with the player. If the player's health reaches 0, the game will end.   

Zombies will spawn in waves. After every wave there is some time to prepare for
the next wave. As of now, there are 15 zombies per wave.

## How to Play
The player can move up, left, down, and/or right using the standard W-A-S-D keys.

`W - UP`

`A - LEFT`

`S - DOWN`

`D - RIGHT`

The player can shoot projectiles in the direction specified by a mouse click.
For example, if the player is in the middle of the house and you want to shoot
toward the right wall, the mouse should be clicked on that side of the player.

The player can repair windows by pressing the `R` key.

The player has a limited amount of ammunition. Zombies have approximately a 50%
chance of dropping ammunition. If the player walks over this spot where the
zombie may have dropped some, then the player's ammunition will be slightly
replenished.

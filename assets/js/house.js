function House(x, y) {
  this.outerX = x;
  this.outerY = y;
  this.outerWidth = 750;
  this.outerHeight = 500;
  this.innerX = x + 5;
  this.innerY = y + 5;
  this.innerWidth = this.outerWidth - 10;
  this.innerHeight = this.outerHeight - 10;
  this.show = function () {
    //wall of the house
    fill(219, 224, 168);
    rect(this.outerX, this.outerY, this.outerWidth, this.outerHeight, 8);
    //inside of the house
    fill(138, 140, 123);
    rect(this.innerX, this.innerY, this.innerWidth, this.innerHeight);

    /* BEDROOM */
    //bed
    //fill(9, 109, 33);
    //rect(180, 90, 80, 50);
    fill(99, 73, 25);
    rect(325, 90, 25, 25);
    image(bed_img, 180, 90, 80, 50);
    //bedroom bottom wall
    fill(219, 224, 168);
    rect(180, 270, 210, 5);
    //bedroom upper right wall
    rect(385, 250, 5, 25);
    //bedroom lower right wall
    rect(385, 85, 5, 105);
    fill(112, 84, 25);

    /* KITCHEN */
    //tile floor
    /*fill(147, 141, 128);
    rect(663, 90, 257, 215);*/
    image(tile_img, 663, 90, 257, 215);
    // Sink / Countertops
    fill(76, 71, 61);
    //upper countertop
    rect(680, 90, 240, 30);
    //right countertop
    rect(890, 120, 30, 145);
    //sink
    fill(130, 127, 122);
    rect(780, 90, 30, 30);

    /* COUCHES */
    fill(112, 84, 25);
    //upper couch
    rect(670, 345, 125, 40);
    image(horiz_couch, 670, 345, 125, 40);
    //right couch
    //rect(830, 410, 40, 100);
    image(vert_couch, 830, 415, 40, 95);
    //rug
    //fill(112, 54, 25);
    rect(658, 410, 145, 105);

  };
}

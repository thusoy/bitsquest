/*
 * This other bot is helping-- somewhat.
 */

this.on("start", function(){
  this.thrusters.bottom(true);
});

this.on("sensor:top", function(){
  this.thrusters.bottom(false);
  this.thrusters.left(true);
  this.radar.angle(0);
  this.radar.ping();
});

this.on("radar:hit", function(angle, distance){
  if (distance > 7){
    this.thrusters.left(true);
  } else {
    this.thrusters.left(false);
  }
  this.radar.ping();
});

this.on("radar:miss", function(){
  this.thrusters.left(true);
});
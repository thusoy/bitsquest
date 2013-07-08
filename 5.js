/*
 * No explanation.
 */

 /**
 * Tactic: Where you are coming from and where you are headed to
 * is the same each time you hit a wall, just stop the movement where
 * you came from, and start off in the direction you're going.
 */

this.on("start", function(){
  this.thrusters.top(true);
});

this.on("sensor:bottom", function(contact){
  if (!contact) return;
  this.thrusters.top(false);
  this.thrusters.left(true);
});

this.on("sensor:right", function(contact){
  if (!contact) return;
  this.thrusters.left(false);
  this.thrusters.bottom(true);
});

this.on("sensor:top", function(contact){
  if (!contact) return;
  this.thrusters.bottom(false);
  this.thrusters.right(true);
});

this.on("sensor:left", function(contact){
  if (!contact) return;
  this.thrusters.right(false);
  this.thrusters.top(true);
});
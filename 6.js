/*
 * The round switches won't stay on unless something is placed on top of them.
 */


 /**
 * Tactic: Move in these directions: >, ^, >, v, >, v, >, ^, >
 * The sensors will trigger on the big boxes, even though you can move them,
 * so you have to `disable` the sensors when pushing. The sensors will trigger
 * when you move past the small blue boxes though, use them to know when you're 
 * done pushing.
 */

var numRights = 0;
var ignoreTop = false;
var finalTurn = false;
var ignoreBottom = true;

this.on("start", function(){
  this.thrusters.bottom(true);
});

this.on("sensor:top", function(contact){
  if (!contact || ignoreTop) return;
  this.thrusters.bottom(false);
  this.thrusters.left(true);
});

this.on("sensor:right", function(contact){
  if (!contact) return;
  this.thrusters.left(false);
  numRights += 1;
  if(numRights <= 2){
    this.thrusters.top(true);
  } else {
    this.thrusters.bottom(true);
    ignoreTop = true;
  }
  if (numRights == 2){
    ignoreBottom = false;
  }
});

this.on("sensor:left", function(contact){
  if (!contact) return;
  if(finalTurn){
    this.thrusters.bottom(false);
  } else {
      this.thrusters.top(false);
      finalTurn = true;
  }
  this.thrusters.left(true);

});

this.on("sensor:bottom", function(contact){
  if (!contact || ignoreBottom) return;
  this.thrusters.left(true);
  this.thrusters.top(false);
});
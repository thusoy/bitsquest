/*
 * The square below is a pressure switch. Move your robot over it to trigger
 * the change to the on state and open the door.
 */

/**
* Tactic: You have to move diagonally to hit the button. Do that
* until we hit the floor, then move up and to the right.
*/

this.on("start", function(){
  this.thrusters.top(true);
  this.thrusters.left(true);
});

this.on("sensor:bottom", function(contact){
  this.thrusters.top(false);
  this.thrusters.bottom(true);

});

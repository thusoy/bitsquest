/*
 * Some times it helps to retain some state, state like "did I just come from 
 * back there?" You can keep any data you wish to preserve across events 
 * in the closure created by the initial execution of your code.
 *
 * For example:
 *
 *   var beenThere = false;
 *   
 *   this.on('sensor:left', function() {
 *      beenThere = true;
 *   });
 *
 *   this.on('sensor:right', function() {
 *      if (beenThere) {
 *         // already been left
 *      }
 *   });
 */

 /**
 * Tactic: Move up and to the right until we hit the roof, move until we find the 
 * right wall, move down and out.
 */

this.on("start", function(){
  this.thrusters.left(true);
  this.thrusters.bottom(true);
});

this.on("sensor:right", function(contact){
  this.thrusters.top(true);
  this.thrusters.bottom(false);
});

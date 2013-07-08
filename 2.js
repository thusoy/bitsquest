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
 * Tactic: Move right until you hit the wall, then head upwards and out.
 */

this.on("start", function(){
  this.thrusters.left(true);
});

this.on("sensor:right", function(contact){
  this.thrusters.bottom(true);
});
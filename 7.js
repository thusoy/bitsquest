/*
 * Not only does your robot come equipped with sensors and thrusters. It also
 * has a radar that can be used to determine distances.
 *
 * The radar has two methods:
 *
 *
 *  - angle()       - the current direction the radar is pointing (0-359)
 *  - angle(number) - set the radar direction (0-359)
 *
 *  - ping()        - fires the radar
 *
 * One of two events will return after firing the radar:
 *  - 'radar:hit'   - an object was found
 *  - 'radar:miss'  - no object was found
 *
 * When a hit event is received, the handler will receive the angle the
 * ping was sent out on and the distance to the object, e.g.,
 *    this.on('radar:hit', function(angle, distance) {
 *       // do stuff
 *    });
 *
 *  Bonus info: 
 *
 *      Those red jumpy things will kill your robot. Don't touch them.
 */


 /** 
 * Tactic: Find the middle of the maze (distance to both sides ~equal), then
 * go down until door is found on the right.
 */

this.on("start", function(){
  this.thrusters.left(true);
  fireBoth(this);
});

var distanceRight = null
  , distanceLeft = null;

function fireBoth(bit){
  bit.radar.angle(0);
  bit.radar.ping();
  bit.radar.angle(180);
  bit.radar.ping();
}

this.on("radar:hit", function(angle, distance){
  if (angle === 0){
    distanceRight = distance;
  } else {
    distanceLeft = distance;
  }

  // If approx middle
  if (Math.abs(distanceLeft - distanceRight) < 15){   
    this.thrusters.left(false);
    this.thrusters.top(true);
  }

  if (this.thrusters.left()){
    fireBoth(this);
  } else {
    this.radar.angle(0);
    this.radar.ping();
  }
});

// Door spotted
this.on("radar:miss", function(){
  this.thrusters.left(true);
  this.thrusters.top(false);
});

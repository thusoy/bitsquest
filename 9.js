/*
 * Open all three doors to exit.
 *
 * The answer is 5.
 */

 /**
 * Tactic: The doors open when the buttons is enabled like a binary 5: 101
 * To do this, we go up and to the right until we're on the same height as the buttons.
 * We then start moving right, until we have enabled all three. When we have enabled the
 * last one, we turn and head back to disable the middle one. Once that has been disabled,
 * we should be able to spot the exit below us.
 */

var buttonDistanceToFloor = 370;
var buttonToWallDistance = 110;
var state = "findingButtons";

// Start moving up and to the right, measuring distance to the floor
this.on("start", function(){
    this.thrusters.left(true);
    this.thrusters.bottom(true);
    this.radar.angle(90);
    this.radar.ping();
});

this.on("radar:hit", function(angle, distance){
    if (state === "findingButtons"){
      if (Math.abs(buttonDistanceToFloor - distance) < 10){
          this.thrusters.bottom(false);
          this.radar.angle(0);
          this.radar.ping();
          state = "turningOnButtons";
      } else {
          this.radar.ping();
      }
    } else if(state === "turningOnButtons"){
        if (Math.abs(buttonToWallDistance - distance) < 10){
            this.thrusters.left(false);
            this.thrusters.right(true);
            this.radar.angle(90);
            this.radar.ping();
            state = "lookingForExit";
        } else {
            this.radar.ping();
        }
    } else {
        this.radar.ping();
    }
});

// Exit found
this.on("radar:miss", function(){
    this.thrusters.right(false);
    this.thrusters.top(true);
});
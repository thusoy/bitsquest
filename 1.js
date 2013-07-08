/*
 * Two thrusters!
 *
 * Once you turn on a thruster, it will continue to return true (and fire) 
 * until you return it to a false state. None of this information will be
 * useful here but it's best to get it out of the way earlier rather than later.
 */

this.on('start', function() {
    this.thrusters.left(true);
    this.thrusters.top(true);
});

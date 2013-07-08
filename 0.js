/*
 Your goal is to get the bitbucket bot to the next level by navigating it to 
 the exit. To do this, you will need write JavaScript code that listens for 
 events and calls functions to control the robot.  You can use the JavaScript 
 thrusters object on the robot (this) to control the four thrusters:

  thrusters.left()
    returns true if the left thruster is firing.
  thrusters.left(boolean)
    turns on the left thruster when the value is true; turns if off otherwise.

  thrusters.right()
    returns true if the right thruster is firing.
  thrusters.right(boolean)
    turns on the right thruster when the value is true; turns if off otherwise.

  thrusters.top()
    returns true if the top thruster is firing.
  thrusters.top(boolean)
    turns on the top thruster when the value is true; turns if off otherwise.

  thrusters.bottom()
    returns true if the bottom thruster is firing.
  thrusters.bottom(boolean)
    turns on the bottom thruster when the value is true; turns if off otherwise.

  The first event you should listen for is called 'start', use 
  this.on('start', function() {} ) to define your event handlers.
  
  You can write your javascript below -- although we've already done this one
  for you.
*/

// Go left
this.on('start', function() {
  this.thrusters.left(true);
});

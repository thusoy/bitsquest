/*
 * The round switches won't stay on unless something is placed on top of them.
 */

this.thrusters.bottom(true);
var thrusters = this.thrusters;

var instructions = [
  {step: function (contact) {
    thrusters.bottom(false);
    thrusters.left(true);
  }},
  {step: function (contact) {
    thrusters.left(false);
    thrusters.top(true);
  }},
  {step: function (contact) {
  }},
  {step: function (contact) {
    thrusters.top(false);
    thrusters.left(true);
  }},
  {step: function (contact) {
    thrusters.left(false);
    thrusters.top(true);
  }},
  {step: function (contact) {
    thrusters.top(false);
    thrusters.left(true);
  }},
  {step: function (contact) {
    thrusters.left(false);
    thrusters.bottom(true);
  }},
  {step: function (contact) {
  }},
  {step: function (contact) {
    thrusters.bottom(false);
    thrusters.left(true);
  }}
];

var next = function(contact) {
  if (contact){
    instructions[current_action].step(contact);
    current_action++;
  }
};

var current_action = 0;

this.on('sensor:top', next);
this.on('sensor:right', next);
this.on('sensor:left', next);
this.on('sensor:bottom', next);

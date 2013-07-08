/*
 * Do it.
 *
 */

/**
* Tactic: Wallhugging. Find a wall, and stick along with it. When you hit stuff,
* you're always doing the same thing. Take care though to note which thruster
* is firing when you hit stuff, that will tell you if you intended to get away from
* the wall, or wheter the wall ended.
*/

this.on("start", function(){
    this.thrusters.left(true);
});

this.on("sensor:right", function(contact){
    console.log("Right: " + contact);
    if (contact){
        enableOnly(this, "top");
    } else {
        if (this.thrusters.top()){
            enableOnly(this, "left");
        }
    }
});


this.on("sensor:bottom", function(contact){
    console.log("Bottom: " + contact);
    if (contact){
        enableOnly(this, "right");
    } else {
        if (this.thrusters.right()){
            enableOnly(this, "top");
        }
    }
});

this.on("sensor:left", function(contact){
    console.log("Left: " + contact);
    if (contact){
        enableOnly(this, "bottom");
    } else {
        if(this.thrusters.bottom()){
            enableOnly(this, "right");
        }
    }
});

this.on("sensor:top", function(contact){
    console.log("Top: " + contact);
    if (contact){
        enableOnly(this, "left");
    } else {
        if (this.thrusters.left()){
            enableOnly(this, "bottom");
        }
    }
});

function enableOnly(bit, dir){
    var thrusters = ["top", "left", "bottom", "right"];
    for(var i = 0; i < thrusters.length; i++){
        var thruster = thrusters[i];
        bit.thrusters[thruster](dir === thruster);
    }
}
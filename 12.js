/*
 * Do it.
 *
 */

/**
 * Tactic: Wallhugging with extensive use of radar instead of sensors.
 * Radar fires two beams in turns. First beam determines distance to the wall
 * toward which we are moving. Second beam fires perpendicularly to the first one
 * and determines whether there is an empty space. If empty space is found we continue
 * to move in the current direction to ensure that we can turn without touching wall edge.
 * While turning we disable empty space checking for some time to prevent faulty
 * empty space detection. Wall detection beam fires more frequently than space detection
 * beam because of a high risk of wall touching.
 */

var state = null;
var direction = null;
var turnDistance = null;
var gapCheckDistance = null;

var wallTouchThreshold = 12;
var gapCheckBlockThreshold = 12;
var turnThreshold = 10;
var gapDepth = 20;
var gapCheckRatio = 5;

var directions = ["bottom", "right", "top", "left"];
var turns = ["left", "bottom", "right", "top"];
var wallCheckAngles = [90, 0, 270, 180];
var gapCheckAngles = [180, 90, 0, 270];

function go(bit, d){
    turnDistance = null;
    gapCheckDistance = null;

    bit.thrusters.top(false);
    bit.thrusters.bottom(false);
    bit.thrusters.left(false);
    bit.thrusters.right(false);

    direction = d;

    if (d.indexOf('bottom') > -1){
        bit.thrusters.top(true);
    }
    if (d.indexOf('right') > -1){
        bit.thrusters.left(true);
    }
    if (d.indexOf('top') > -1){
        bit.thrusters.bottom(true);
    }
    if (d.indexOf('left') > -1){
        bit.thrusters.right(true);
    }

    bit.radar.angle(wallCheckAngles[directions.indexOf(d)]);
    bit.radar.ping();
}

this.on('radar:hit', function(angle, distance){
    if (state === "turning"){
        //Initiate distance value at which actual turn will be performed
        if (!turnDistance){
            turnDistance = distance - turnThreshold;
        }

        //If distance is acceptable to perform turn ->
        //disable gap checking and perform turn
        if (distance < turnDistance){
            state = "blockingGapCheck";
            go(this, turns[directions.indexOf(direction)]);
            return;
        }
    }

    if (state === "blockingGapCheck"){
        //Initiate distance value at which gap check can be performed
        if (!gapCheckDistance){
            gapCheckDistance = distance - gapCheckBlockThreshold;
        }

        //If distance is acceptable to perform gap check ->
        //enable gap checking
        if (distance < gapCheckDistance){
            state = null;
        }
    }

    //Detect whether current radar beam is wall checking or gap checking
    //by matching current direction and beam angle.
    if (wallCheckAngles[directions.indexOf(direction)] == angle){
        //If bit is about to touch the wall -> change thrust direction anticlockwise
        if (distance < wallTouchThreshold){
            var dirIdx = directions.indexOf(direction);
            var nextDirIdx = (dirIdx < (directions.length - 1)) ? (dirIdx + 1) : 0;
            go(this, directions[nextDirIdx]);
            return;
        }

        //If bit is not turning, gap check is allowed and gap check frequency is matched ->
        //radar angle is set to check available gap
        if (state === null && distance % gapCheckRatio == 0){
            var gapCheckAngle = gapCheckAngles[directions.indexOf(direction)];
            this.radar.angle(gapCheckAngle);
        }
    } else {
        //If gap was detected -> prepare to turn
        if (distance > gapDepth){
            state = "turning";
        }

        //Restore wall approach check
        var wallCheckAngle = wallCheckAngles[directions.indexOf(direction)];
        this.radar.angle(wallCheckAngle);
    }

    this.radar.ping();
});

this.on('radar:miss', function(angle){
    //Navigate to the direction of missed radar check
    go(this, directions[wallCheckAngles.indexOf(angle)]);
});

this.on('start', function(){
    go(this, 'top');
});

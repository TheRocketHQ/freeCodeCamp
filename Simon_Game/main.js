
//variables
var error = false; //for errors
var strict = false; //for strict mode
var gameOn = false; //switch to turn game on or off
//sequences
userSeq = [];
simonSeq = [];
const numLevels = 20; //levels to win the game
var id, color, level = 0;
//sounds
var boardSound = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", //Green sound
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", //Red sound
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", //Yellow sound
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" //Blue sound
];

//0- Actions needed       
// Generate random number for sequence
function getRandomNum() {
    var random = Math.floor(Math.random() * 4);
    simonSeq.push(random);
}
// Play board sound
function playSound(id) {
    var sound = new Audio(boardSound[id]);
    sound.play();
}
// Add a temporary class, sound    //userSequence
    function userSequence() {
        userSeq.push(id);
        addClassSound(id, color);
        if (!checkUserSeq()) {
            //if playing strict mode reset everything
            if (strict) {
                simonSeq = [];
                level = 1;
            }
            error = true;
            displayError();
            userSeq = [];
            simonSequence();
        }
        //checking end of sequence
        else if (userSeq.length == simonSeq.length && userSeq.length < numLevels) {
            level++;
            userSeq = [];
            error = false;
            simonSequence();
        }
        //checking for winners
        if (userSeq.length === numLevels) {
            displayWinner();
            resetGame();
        }
    }
function addClassSound(id, color) {
    $("#" + id).addClass(color + "-active");
    playSound(id);
    setTimeout(function () {
        $("#" + id).removeClass(color + "-active");
    }, 350);
}
//Reset game
function resetGame() {
    userSeq = [];
    simonSeq = [];
    level = 0;
    $(".display").text("00");
}

//1- Start sequence board
$(document).ready(function () {
    $(".display").text("");
    $(".start").click(function () {
        strict = false;
        error = false;
        level = 0;
        level++;
        simonSeq = [];
        userSeq = [];
        simonSequence();
    });
    //listeners
    //User pad listener
    $(".pad").click(function () {
        id = $(this).attr("id");
        color = $(this).attr("class").split(" ")[1];
        userSequence();
    });
    //Strict mode listener - "I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses. "
    $(".strict").click(function () {
        strict = true;
        level = 0;
        level++;
        simonSeq = [];
        userSeq = [];
        simonSequence();
    });
    // Switch listener
    $(".switch").click(function () {
        gameOn = (gameOn == false) ? true : false;
        if (gameOn) {
            $(".inner-switch").addClass("inner-inactive");
            $(".switch").addClass("outter-active");
            $(".display").text("00");
        }
        else {
            $(".inner-switch").removeClass("inner-inactive");
            $(".switch").removeClass("outter-active");
            $(".display").text("");
        }
    });
});

//2 - Sequences 
    //userSequence
    function userSequence() {
        userSeq.push(id);
        addClassSound(id, color);
        if (!checkUserSeq()) {
            //if playing strict mode reset everything
            if (strict) {
                console.log("strict");
                simonSeq = [];
                level = 1;
            }
            error = true;
            displayError();
            userSeq = [];
            simonSequence();
        }
        //checking end of sequence
        else if (userSeq.length == simonSeq.length && userSeq.length < numLevels) {
            level++;
            userSeq = [];
            error = false;
            simonSequence();
        }
        //checking for winners
        if (userSeq.length === numLevels) {
            displayWinner();
            resetGame();
        }
    }
//simonSequence
    function simonSequence() {
        $(".display").text(level);
        if (!error) {
            getRandomNum();
        }
        if (error && strict) {
            getRandomNum();
        }
        var i = 0;
        var myInterval = setInterval(function () {
            id = simonSeq[i];
            color = $("#" + id).attr("class");
            color = color.split(" ")[1];
            console.log(id + " " + color);
            addClassSound(id, color);
            i++;
            if (i === simonSeq.length) {
                clearInterval(myInterval);
            }
            function resetGame() {
            userSeq = [];
            simonSeq = [];
            level = 0;
            $(".display").text("00");
            }
        }, 1000);
    }
// userSequence vs simonSequence
    function checkUserSeq() {
        for (var i = 0; i < userSeq.length; i++) {
            if (userSeq[i] != simonSeq[i]) {
                return false;
            }
        }
        return true;
    }

//3- Display 
    //display error  
    function displayError() {
        var counter = 0;
        var myError = setInterval(function () {
            $(".display").text("Err");
            counter++;
            if (counter === 3) {
                $(".display").text(level);
                clearInterval(myError);
                userSeq = [];
                counter = 0;
            }
        }, 500);
    }
    //display winner 
    function displayWinner() {
        var count = 0;
        var winInterval = setInterval(function () {
            count++;
            $(".display").text("Win");
            if (count === numLevels) {
                clearInterval(winInterval);
                $(".display").text("00");
                count = 0;
            }
        }, 500);
    }



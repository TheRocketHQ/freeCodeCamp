$(document).ready(function () {
    //Set global variables
    var initialValue = 25; //time to be counted down
    var currentTime = Date.parse(new Date());
    var deadline;
    var timeInterval;

    //Display the clock
    var clock = document.getElementById("clock-timer");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    //minCount
    function minCount() {
        $(".pomodoro-minutes-count").html(initialValue);
        minutesSpan.innerHTML = ("0" + initialValue).slice(-2);
    }
    //secCount
    function secCount() {
        secondsSpan.innerHTML = "00";
    }
    //timeCount
    function timeCount() {
        minutesSpan.innerHTML = ("0" + initialValue).slice(-2);
        secondsSpan.innerHTML = "00";
    }
    //counts the time
    minCount();
    secCount();

    //decrease - sets the limit value for min inital value
    function decrease() {
        if (initialValue < 1) {
            initialValue = 1;
        }
    }

    //increases -  sets the limit value for man inital value
    function increase() {
        if (initialValue > 60) {
            initialValue = 60;
        }
    }

    //plus btn
    $("#pomodoro-plus-btn").click(function () {
        initialValue++;
        increase();
        minCount();
    });

    //minus btn
    $("#pomodoro-minus-btn").click(function () {
        initialValue--;
        decrease();
        minCount();
    });

    //Calculate the time remaining	
    function getTimeLeft(end) {
        var total = Date.parse(end) - Date.parse(new Date());
        var seconds = Math.floor((total / 1000) % 60);
        var minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            "total": total,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    //Initialize the timer
    function startClock() {
        timeInterval = setInterval(function () {
            var t = getTimeLeft(deadline);
            minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
            secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
            $("title").html(("0" + t.minutes).slice(-2) +
                ":" + ("0" + t.seconds).slice(-2));
            if (t.total <= 0) { //If timer reaches zero, stop the timer and reset the clock         clearInterval(timeInterval);
                if (i === 1) {
                    startPomodoro();
                }
            }
        }, 1000);
    }

    //Functions for buttons, and reset
    function startPomodoro() {
        $(".start-pomodoro, .session-length").addClass('hidden');
        $(".reset").removeClass('hidden');
        $(".btn-count").prop("disabled", true);
        deadline = new Date(Date.parse(new Date()) + (initialValue * 60 * 1000));
        startClock();
        timeCount();
    }

    //Functions for reset
    function resetClock() {
        $(".btn-count").prop("disabled", false);
        $(".start-pomodoro, .session-length").removeClass('hidden');
        $(".reset").addClass('hidden');
        $(".minutes-count").html(initialValue);
        $("title").html("Pomodoro");
        clearInterval(timeInterval);
        timeCount();

    }

    //Start Pomodoro
    $(".start-pomodoro").click(function () {
        startPomodoro();
    });

    //Reset the clock
    $(".reset").click(function () {
        resetClock();
    });

});

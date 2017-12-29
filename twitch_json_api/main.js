//jquery
$(document).ready(function () {
    var deletedFollowers = ['brunofin', 'comster404'];

    //is Free Code Camp online?
    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/freecodecamp",
        headers: {
            'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
        },
        success: function (data1) {
            debugger; //is it missing the debugger?
            if (data1.stream === null) {
                //FCC Offline
                $("#fccStatus").prepend("Offline");
            } else {
                //FCC Online
                $("#fccStatus").prepend("Live");
            }
        } //end of success
    }); //end of ajax

    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
        headers: {
            'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
        },
        success: function (data2) {
            for (var i = 0; i < data2.follows.length; i++) {
                //gets displayName
                var displayName = data2.follows[i].channel.display_name;
                var logo = data2.follows[i].channel.logo;
                var status = data2.follows[i].channel.status;
                if (logo === null) {
                    logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
                }
                $("#followerInfo").prepend(
                    "<div class='media mx-auto'>" +
                    "<a href='https://www.twitch.tv/' target='_blank'" + displayName + "'>" +
                    "<img class='d-flex mr-3 img-small' alt='Generic placeholder image' src='" + logo + "'>" +
                    "<div class='media-body'>" +
                    "<h5 class='mt-0'>" + displayName +
                    "</h5>" +
                    "</a>" +
                    status +
                    "</div></div>"
                );
                //$("#followerInfo").prepend(logo + displayName + status);
            } //end of array
        } //end of function follows   
    }); //end of ajax

    for (var i = 0; i < deletedFollowers.length; i++) {
        $.ajax({
            type: "GET",
            url: "https://api.twitch.tv/kraken/streams/" + deletedFollowers[i],
            headers: {
                'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
            },
            error: function (data3) {
                var logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
                var displayName = data3.statusText;
                var status = data3.status;
                $("#followerInfo").prepend(
                    "<div class='media mx-auto'>" +
                    "<a href='https://www.twitch.tv/'" + displayName + "'>" +
                    "<img class='d-flex mr-3 img-small' alt='Generic placeholder image' src='" + logo + "'>" +
                    "<div class='media-body'>" +
                    "<h5 class='mt-0'>" + displayName +
                    "</h5>" +
                    "</a>" +
                    status +
                    "</div></div>"
                );
            } //end of error function data3
        }); //end of ajax
    } //end of array deleted followers

}); //End of function
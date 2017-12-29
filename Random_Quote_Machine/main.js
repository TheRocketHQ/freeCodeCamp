$(document).ready(function () {
    getQuote();
    var quoteTweet;
    var authorTweet;

    function getQuote() {
        var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
        $.getJSON(url, function (data) {
            $("#quote").html('"' + data.quoteText + '"');
            $("#author").html("" + data.quoteAuthor);
            quoteTweet = data.quoteText;
            authorTweet = data.quoteAuthor;
        });

    }

    $("#newquote").on("click", function () {
        getQuote();
    });

    $("#tweetbtn").on("click", function () {
        window.open("https://twitter.com/intent/tweet?text=" + quoteTweet + " - " + authorTweet);
    });

});
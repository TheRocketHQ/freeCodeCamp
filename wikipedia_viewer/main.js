//Run some jQuery
$(document).ready(function () {//When search is clicked run code
    $('#search').click(function () {//Gets search input
        var searchTerm = $('#searchTerm').val();

        //API url with searchTerm
        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";

        //Wikipedia API ajax call
        $.ajax(
            {
                type: "GET",
                url: url,
                async: false,
                dataType: "json",
                success:
                    function (data) {
                        $('#output').html('');
                        for (var i = 0; i < data[1].length; i++) {
                            $('#output').prepend("<il><a href= " + data[3][i] + ">" + data[1][i] + "</a><p>" + data[2][i] + "</p></il>");
                        }
                    },
                error:
                    function (errorMessage) {
                        alert("Error");
                    }
            });// end of ajax

        //press enter to search
        $("#input").keyup(function (event) {
            if (event.keyCode == 13) {
                $("#search").click();
            }
        });//end of search

    });
});//document
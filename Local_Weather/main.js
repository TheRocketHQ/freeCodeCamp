var API_KEY = "e067d881f375ee6384a4a2421eb88c0d";
var cel = false;
var wd;

function displayTemp(fTemp, c) {
    if (c)
        return Math.round((fTemp - 32) * (5 / 9)) + "ºC";
    return Math.round(fTemp) + "ºF";
}

function render(wd, cel) {
    var currentLocation = wd.name;
    var currentWeather = wd.weather[0].description;
    var currentTemp = displayTemp(wd.main.temp, cel);
    var high = displayTemp(wd.main.temp_max, cel);
    var low = displayTemp(wd.main.temp_min, cel);
    var icon = wd.weather[0].icon;

    $('#currentLocation').html(currentLocation);
    $('#currentWeather').html(currentWeather);
    $('#currentTemp').html(currentTemp);
    $('#high-low').html(high + " / " + low);

    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
    $('#currentLocation').prepend('<img src="' + iconSrc + '"<br>');
}

$(function () //json api weather location
    {

        var loc;

        $.getJSON('https://ipinfo.io', function (d) {
            console.log("assigning the data...");
            loc = d.loc.split(",");
            console.log(loc);

            $.getJSON('https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY, function (apiData) {
                wd = apiData;

                render(apiData, cel);

                $('#toggle').click(function () {
                    cel = !cel;
                    render(wd, cel);
                });
            });

        });


    });

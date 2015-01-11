/*
* This function calls the clock and weather functions.
*/
window.onload = function  () {
    showTime();
    showWeather();
};

// Runs the clock.
function showTime () {
    setTime();
    var timeTimerID = setInterval(function(){setTime();}, 1000);
}

// Injects current time into the required HTML element
function setTime() {
    var currentTime = new Date();
    var currentHour = (currentTime.getHours() < 10 ? "0" + currentTime.getHours() : currentTime.getHours());
    var currentMinute = (currentTime.getMinutes() < 10 ? "0" + currentTime.getMinutes() : currentTime.getMinutes());
    var currentSeconds = (currentTime.getSeconds() < 10 ? "0" + currentTime.getSeconds() : currentTime.getSeconds());

    $("#time").html(currentHour + " : " + currentMinute + " : " + currentSeconds);
}

// Weather function timer
function showWeather () {
    getWeather();
    var weatherTimerID = setInterval(function () {getWeather();}, 360000);
}

/*
* Makes a request to open weather map's api to get the weather at a given 
* location.
* 
* To get the weather information for your location, change the query 
* to your location.
*/
function getWeather () {
    $.ajax({
        type: 'GET',
        // CHANGE THE VALUE AFTER `q` TO YOUR OWN LOCATIONs
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Hyderabad,IN',
        dataType: 'jsonP',
        success: function (data) {
            setWeather(data);
        },
        error: function  (request, status, error) {
            console.log(error);
        }
    });
}

/*
* Injects the current weather details into the given HTML element
*
* Open weather map uses the Kelvin scale for temparature values. Therefore
* some simple math returns the temparature in the Celius scale.
*/ 
function setWeather (data) {
    weather = {};
    weather.temp = Math.round(data.main.temp - 273.15);
    descriptions = [data.weather[0].description];
    weather.descriptions = descriptions;
    weather.minTemp = Math.round(data.main.temp_min - 273.15);
    weather.maxTemp = Math.round(data.main.temp_max - 273.15);

    $('.weather #temp').html(weather.temp);
    $('.weather #condition').html(weather.descriptions[0]);
    $('.weather #min-temp').html(weather.minTemp);
    $('.weather #max-temp').html(weather.maxTemp);
}
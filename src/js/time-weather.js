window.onload = function  () {
    showTime();
    showWeather();
};

function showTime () {
    setTime();
    var timeTimerID = setInterval(function(){setTime();}, 1000);
}

function setTime() {
    var currentTime = new Date();
    var currentHour = (currentTime.getHours() < 10 ? "0" + currentTime.getHours() : currentTime.getHours());
    var currentMinute = (currentTime.getMinutes() < 10 ? "0" + currentTime.getMinutes() : currentTime.getMinutes());
    var currentSeconds = (currentTime.getSeconds() < 10 ? "0" + currentTime.getSeconds() : currentTime.getSeconds());

    $("#time").html(currentHour + " : " + currentMinute + " : " + currentSeconds);
}

function showWeather () {
    getWeather();
    var weatherTimerID = setInterval(function () {getWeather();}, 60000);
}


function getWeather () {
    $.ajax({
        type: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Hyderabad,in',
        dataType: 'jsonP',
        success: function (data) {
            setWeather(data);
        },
        error: function  (request, status, error) {
            console.log(error);
        }
    });
}

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
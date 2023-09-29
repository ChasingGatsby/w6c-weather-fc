$(function () {
  let searchBtn = $(".search");
  let coord;
  let forecast = [];
  let futureWeather;
  let todayWeather;
  let dayCard;

  function clearDisplay() {
    $("#weather-display").empty();
  }

  $(document).ready(function () {
    searchBtn.on("click", function () {
      clearDisplay();
      let searchTerm = $("#searchterm").val();
      let geoCode =
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
        searchTerm +
        "&limit=1&appid=abd9e26df26a80b0ccf0eded91e05ebc";
      fetch(geoCode)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          coord = {
            lat: data[0].lat,
            lon: data[0].lon,
          };
          console.log(coord);
        })
        .then(function () {
          let weatherCond =
            "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            coord.lat +
            "&lon=" +
            coord.lon +
            "&appid=abd9e26df26a80b0ccf0eded91e05ebc";
          fetch(weatherCond)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              todayWeather = {
                name: data.city.name,
                date: dayjs.unix(data.list[0].dt).format("MM/DD/YYYY"),
                temp: data.list[0].main.temp,
                wind: data.list[0].wind.speed,
                humidity: data.list[0].main.humidity,
                icon: data.list[0].weather[0].icon,
              };
              console.log(todayWeather);
              for (let i = 0; i < 5; i++) {
                futureWeather = {
                  name: data.city.name,
                  date: dayjs.unix(data.list[i + 1].dt).format("MM/DD/YYYY"),
                  temp: data.list[i + 1].main.temp,
                  wind: data.list[i + 1].wind.speed,
                  humidity: data.list[i + 1].main.humidity,
                  icon: data.list[i + 1].weather[0].icon,
                };
                forecast.push(futureWeather);
                console.log(forecast);
              }

              $("#weather-display")
                .append("<div></div>")
                .find("div")
                .addClass("now-weather");
              let todayDisplay = $(".now-weather");
              todayDisplay.append(
                "<h2>" + todayWeather.name + " (" + todayWeather.date + ")</h2>"
              );
              todayDisplay.append("<p>Temp: " + todayWeather.temp + "K</p>");
              todayDisplay.append("<p>Wind: " + todayWeather.wind + " mph</p>");
              todayDisplay.append(
                "<p>Humidity: " + todayWeather.humidity + "%</p>"
              );
              console.log(forecast);
              $("#weather-display")
                .append("<article></article>")
                .find("article")
                .attr("id", "fiveday");

              for (let i = 0; i < forecast.length; i++) {
                $("#fiveday")
                  .append("<div></div>")
                  .find("div")
                  .addClass("daycard");
              }
              dayCard = ($('.daycard'))
              console.log(dayCard)

              for (let i= 0; i < dayCard.length; i++) {
                dayCard[i].append(
                  "<h3>" + forecast[i].name + " (" + forecast[i].date + ")</h3>"
                );
                dayCard[i].append("<p>Temp: " + forecast[i].temp + "K</p>");
                dayCard[i].append("<p>Wind: " + forecast[i].wind + " mph</p>");
                dayCard[i].append(
                  "<p>Humidity: " + forecast[i].humidity + "%</p>"
                );
              }
            });
        });
    });
  });
});

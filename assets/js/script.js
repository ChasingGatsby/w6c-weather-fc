$(function () {
  let searchBtn = $(".search");
  let coord;
  let forecast = [];
  let futureWeather;

  let todayWeather;
  $(document).ready(function () {
    searchBtn.on("click", function () {
      let searchTerm = $("#searchterm").val();
      console.log(searchTerm);
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
                date: data.list[0].dt,
                temp: data.list[0].main.temp,
                wind: data.list[0].wind.speed,
                humidity: data.list[0].main.humidity,
                icon: data.list[0].weather[0].icon,
              };
              for (let i = 0; i < forecast.length; i++) {
                futureWeather = {
                  date: data.list[i+1].dt,
                  temp: data.list[i+1].main.temp,
                  wind: data.list[i+1].wind.speed,
                  humidity: data.list[i+1].main.humidity,
                  icon: data.list[i+1].weather[0].icon,
                }
                forecast.push(futureWeather)
                console.log(forecast.length)
              }
            });
        });
    });
  });
});

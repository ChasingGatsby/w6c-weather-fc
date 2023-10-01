$(function () {
  let searchBtn = $(".search");
  let prevBtn = $(".prevsearch");
  let clearBtn = $("#clearbtn");
  let coord;
  let forecast = [];
  let futureWeather;
  let todayWeather;
  let dayCard;
  let searchHist = [];
  let displayHist = JSON.parse(localStorage.getItem("history"));

  for (i = 0; i < displayHist.length; i++) {
    $(".searchhist").append(
      '<input type="button" value="' +
        displayHist[i] +
        '" class="button prevsearch" />'
    );
  }

  function clearDisplay() {
    $('#fiveday').remove()
    $("#weather-display").empty();
  }

  function clearHistory() {
    $(".searchhist").empty();
    localStorage.removeItem("history");
  }

  function addSearch() {
    if (displayHist.includes(todayWeather.name)) {
      return;
    } else {
      $(".searchhist").append(
        '<input type="button" value="' +
          todayWeather.name +
          '" class="button prevsearch" />'
      );
    }
    if (localStorage.getItem("history")) {
      searchHist = JSON.parse(localStorage.getItem("history"));
      recordHist();
    } else {
      recordHist();
    }
  }

  function recordHist() {
    searchHist.push(todayWeather.name);
    let historyLog = JSON.stringify(searchHist);
    localStorage.setItem("history", historyLog);
  }

  function displayWeather() {
    clearDisplay();
    $("#weather-display")
      .append("<div></div>")
      .find("div")
      .addClass("now-weather");
    let todayDisplay = $(".now-weather");
    todayDisplay.append(
      "<h2>" + todayWeather.name + " (" + todayWeather.date + ") <img src='http://openweathermap.org/img/w/" + todayWeather.icon + ".png'></h2>"
    );
    todayDisplay.append("<p>Temp: " + todayWeather.temp + "&#8457;</p>");
    todayDisplay.append("<p>Wind: " + todayWeather.wind + " mph</p>");
    todayDisplay.append("<p>Humidity: " + todayWeather.humidity + "%</p>");
    $("#weather-display").append("<article id='fiveday'></article>");
    fivedayDiv = $("#fiveday");


    for (let i = 0; i < forecast.length; i++) {
      $("#fiveday").append("<div></div>").find("div").addClass("daycard");
    }
    dayCard = $(".daycard");

    for (let i = 0; i < dayCard.length; i++) {
      $(dayCard[i]).html(`
                <h3>${forecast[i].date}</h3>
                <img src ="http://openweathermap.org/img/w/${forecast[i].icon}.png">
                <p>Temp: ${forecast[i].temp}&#8457;</p>
                <p>Wind: ${forecast[i].wind} mph</p>
                <p>Humidity: ${forecast[i].humidity}%</p>
              `);
    }
  }

  clearBtn.on("click", function () {
    clearHistory();
  });

  $(document).on("click", ".prevsearch", function () {
    let searchTerm = $(this).val();
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
          "&units=imperial&appid=abd9e26df26a80b0ccf0eded91e05ebc";
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
            addSearch();
            for (let i = 0; i < 5; i++) {
              futureWeather = {
                name: data.city.name,
                date: dayjs.unix(data.list[i * 9].dt).format("MM/DD/YYYY"),
                temp: data.list[i * 9].main.temp,
                wind: data.list[i * 9].wind.speed,
                humidity: data.list[i * 9].main.humidity,
                icon: data.list[i * 9].weather[0].icon,
              };
              forecast.push(futureWeather);
              console.log(forecast);
            }

            displayWeather();
          });
      });
  });

  $(document).ready(function () {
    searchBtn.on("click", function () {
      clearDisplay();
      let searchTerm = $("#searchterm").val();
      $("#searchterm").val("");
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
            "&units=imperial&appid=abd9e26df26a80b0ccf0eded91e05ebc";
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
              addSearch();
              for (let i = 0; i < 5; i++) {
                futureWeather = {
                  name: data.city.name,
                  date: dayjs.unix(data.list[i * 9].dt).format("MM/DD/YYYY"),
                  temp: data.list[i * 9].main.temp,
                  wind: data.list[i * 9].wind.speed,
                  humidity: data.list[i * 9].main.humidity,
                  icon: data.list[i * 9].weather[0].icon,
                };
                forecast.push(futureWeather);
                console.log(forecast);
              }

              displayWeather();
            });
        });
    });
  });
});

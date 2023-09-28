$(function () {
  let searchBtn = $(".search");

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
          let coord = {
            lat: data[0].lat,
            lon: data[0].lon,
          };
          console.log (coord)
        });
    });
  });
});

var engMatches2020URL = "http://api.football-data.org/v4/competitions/PL/matches?season=2020"

fetch(engMatches2020URL, {
  headers: {
    "X-Auth-Token": "e0003ca701244dcfb4a26e737cb88e78"
  }
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
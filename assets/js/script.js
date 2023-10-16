const bodyElem = $("body");
const logosMainElem = $(".team-logos");

var gameURL = "https://statsapi.web.nhl.com/api/v1/game/";
var gameID;

var homeTeam;
var awayTeam;

const metropolitan = ["CAR", "CBJ", "NJD", "NYI", "NYR", "PHI", "PIT", "WSH"];
const atlantic = ["BOS", "BUF", "DET", "FLA", "MTL", "OTT", "TBL", "TOR"];
const central = ["ARI", "CHI", "COL", "DAL", "MIN", "NSH", "STL", "WPG"];
const pacific = ["ANA", "CGY", "EDM", "LAK", "SJS", "SEA", "VAN", "VGK"];

const eastern = ["metropolitan", "atlantic"];
const western = ["central", "pacific"];

function Team(isHome, name, abbr, score, conf, divi, players) {
  this.isTeamHome = isHome;
  this.teamName = name;
  this.teamAbbr = abbr;
  this.teamScore = score;
  this.conference = conf;
  this.division = divi;
  this.teamPlayers = players;
};


// eastern.forEach(function(item) {
//   console.log(eastern)
//   console.log(item.includes("CAR"))
// })


// The ID of the game. The first 4 digits identify the season of the game (ie. 2017 for the 2017-2018 season). The next 2 digits give the type of game, where 01 = preseason, 02 = regular season, 03 = playoffs, 04 = all-star. The final 4 digits identify the specific game number. For regular season and preseason games, this ranges from 0001 to the number of games played. (1271 for seasons with 31 teams (2017 and onwards) and 1230 for seasons with 30 teams). For playoff games, the 2nd digit of the specific number gives the round of the playoffs, the 3rd digit specifies the matchup, and the 4th digit specifies the game (out of 7).
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomizeGameId() {
  let gameYear;
  let gameType;
  let gameNumber;

  gameYear = "2017";
  // prompt("What year would you like to play from?");
  gameType = "02";
  gameNumber = generateRandomNumber(1, 1271);
  gameNumber = gameNumber.toString().padStart(4, '0');

  gameID = gameYear + gameType + gameNumber;
  console.log(gameID);
  return gameID;
}

function concatArrays(arr1, arr2, arr3, arr4) {
  var arr = arr1.concat(arr2, arr3, arr4);
  arr.sort();
  return arr;
}

const allTeamAbbr = concatArrays(atlantic, metropolitan, central, pacific);

function pullTeamLogo(abbrArray, index) {

  var logoURL = `https://assets.nhle.com/logos/nhl/svg/${abbrArray[index]}_light.svg`;
  var teamLogo = $("<img>");
  teamLogo.attr("src", logoURL);
  teamLogo.attr("class", "logo");
  teamLogo.attr("id", abbrArray[index]);
  teamLogo.attr("style", "width: 100px; height: 100px");
  // elem.append(teamLogo);
  return teamLogo;



  // arr.forEach(function (abbr) {
  //   var logoURL = `https://assets.nhle.com/logos/nhl/svg/${abbr}_light.svg`;
  //   // var tableRow = $(`.${row}-row`);
  //   var teamLogo = $("<img>");
  //   teamLogo.attr("src", logoURL);
  //   teamLogo.attr("class", "logo");
  //   teamLogo.attr("style", "width: 40px; height: 40px");

  //   elem.append(teamLogo);
  // })
  // var logoURL = `https://assets.nhle.com/logos/nhl/svg/${abbr}_light.svg`;
  // var teamLogo = $("<img>");
  // teamLogo.attr("src", logoURL);
  // bodyElem.append(teamLogo);

}

function addTeamLogos() {
  var logosElem = $(".team-logos");

  var logosIndex = 0;

  for (var i = 0; i < 4; i++) {
    logosElem.append(`
    <div class="row team-logo-row-${i}" style="display:flex; flex-wrap: wrap">
    </div>`);
    console.log(`Loop ${i} complete`);
    var logosRowElem = $(`.team-logo-row-${i}`);
    for (var j = 0; j < 2; j++) {
      logosRowElem.append(`<div class="col-6 logos-col-${i}-${j}" style="display:flex; flex-wrap: wrap">
      </div>`);
      var logosColElem = $(`.logos-col-${i}-${j}`);
      console.log(`Loop ${i}-${j} complete`);
      for (var k = 0; k < 4; k++) {
        var logoElem = pullTeamLogo(allTeamAbbr, logosIndex);
        logosColElem.append(`<div class="col-3 logos-box-${i}-${j}-${k}"></div>`);
        var logoBoxElem = $(`.logos-box-${i}-${j}-${k}`);
        logoBoxElem.append(logoElem);
        logosIndex++;
        console.log(logosIndex);
        console.log(`Loop ${i}-${j}-${k} complete`);
      }
    }
  }
}

function showLogoClicked(code) {
  var displayLogo = pullTeamLogo(allTeamAbbr, allTeamAbbr.indexOf(code));
  bodyElem.append(displayLogo);
}










randomizeGameId();

gameURL += gameID + "/feed/live";

// `https://statsapi.web.nhl.com/api/v1/game/${gameID}/boxscore`

fetch(gameURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(dayjs(data.gameData.datetime.dateTime).format("MMM DD, YYYY"))
    //home team and home score
    // console.log(data.gameData.teams.home.name);
    // console.log(data.gameData.teams.home.abbreviation);
    // console.log(data.gameData.teams.home.conference.name);
    // console.log(data.gameData.teams.home.division.name);
    // console.log(data.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals);
    // var homePeople = data.liveData.boxscore.teams.home.onIce;
    // homePeople.forEach(function(item) {
    //   fetch(`https://statsapi.web.nhl.com/api/v1/people/${item}`)
    //     .then(function (response) {
    //       return response.json();
    //     })
    //     .then(function (data) {
    //       // console.log(data);
    //       let playerName = data.people[0].fullName;
    //       let playerNumber = data.people[0].primaryNumber;
    //       console.log(`${playerNumber} ${playerName}`);
    //     })
    // })
    console.log(data.gameData.teams.home.name);
    console.log(data.gameData.teams.home.abbreviation);
    console.log(data.gameData.teams.home.conference.name);
    console.log(data.gameData.teams.home.division.name);
    console.log(data.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals);

    var homeName = (data.gameData.teams.home.name);
    var homeAbr = (data.gameData.teams.home.abbreviation);
    var homeConf = (data.gameData.teams.home.conference.name);
    var homeDivi = (data.gameData.teams.home.division.name);
    var homeScore = (data.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals);
    var homePlayers = [];


    var homePeople = data.liveData.boxscore.teams.home.onIce;
    homePeople.forEach(function (item) {
      fetch(`https://statsapi.web.nhl.com/api/v1/people/${item}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          let playerName = data.people[0].fullName;
          let playerNumber = data.people[0].primaryNumber;
          console.log(`${playerNumber} ${playerName}`);
          homePlayers.push(`${playerNumber} ${playerName}`);
        })
    })

    homeTeam = new Team(true, homeName, homeAbr, homeScore, homeConf, homeDivi, homePlayers);

    // away team and away score
    // console.log(data.gameData.teams.away.name);
    // console.log(data.gameData.teams.away.abbreviation);
    // console.log(data.gameData.teams.away.conference.name);
    // console.log(data.gameData.teams.away.division.name);
    // console.log(data.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals);
    // var awayPeople = data.liveData.boxscore.teams.away.onIce;
    // awayPeople.forEach(function(item) {
    //   fetch(`https://statsapi.web.nhl.com/api/v1/people/${item}`)
    //     .then(function (response) {
    //       return response.json();
    //     })
    //     .then(function (data) {
    //       // console.log(data);
    //       let playerName = data.people[0].fullName;
    //       let playerNumber = data.people[0].primaryNumber;
    //       console.log(`${playerNumber} ${playerName}`);
    //     })
    // })
    console.log(data.gameData.teams.away.name);
    console.log(data.gameData.teams.away.abbreviation);
    console.log(data.gameData.teams.away.conference.name);
    console.log(data.gameData.teams.away.division.name);
    console.log(data.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals);

    var awayName = (data.gameData.teams.away.name);
    var awayAbr = (data.gameData.teams.away.abbreviation);
    var awayConf = (data.gameData.teams.away.conference.name);
    var awayDivi = (data.gameData.teams.away.division.name);
    var awayScore = (data.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals);
    var awayPlayers = [];

    var awayPeople = data.liveData.boxscore.teams.away.onIce;
    awayPeople.forEach(function (item) {
      fetch(`https://statsapi.web.nhl.com/api/v1/people/${item}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          let playerName = data.people[0].fullName;
          let playerNumber = data.people[0].primaryNumber;
          console.log(`${playerNumber} ${playerName}`);
          awayPlayers.push(`${playerNumber} ${playerName}`);
        })
    })

    awayTeam = new Team(false, awayName, awayAbr, awayScore, awayConf, awayDivi, awayPlayers)

    // venue the game took place at
    let venue = (data.gameData.venue.name);
    console.log(venue);
    let venueLink = venue.replaceAll(" ", "+");
    // ADBLOCKER MUST BE DISABLED FOR THIS TO WORK
    $("body").append(`
    <iframe
      width="600"
      height="450"
      style="border:0"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDTxotnfke5TbqtSkPZSB4OkoPgi-cgYsc
        &q=${venueLink}">
  </iframe>`)

    console.log(awayTeam);
    console.log(homeTeam);

  })

// pullTeamLogo(atlantic, metropolitan, central, pacific, "first");

addTeamLogos();

console.log(atlantic.concat(metropolitan, central, pacific));

logosMainElem.on("click", ".logo", function () {
  var logoClicked = this.id;
  console.log(logoClicked);
  console.log("Logo clicked.");
  showLogoClicked(logoClicked);
});
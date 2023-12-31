const bodyElem = $("body");
const logosMainElem = $(".team-logos");

const timerElem = $("#timer-display");
const gameBtnsElem = $(".gameplay-btns");


var gameURL = "https://statsapi.web.nhl.com/api/v1/game/";
var gameID;


var homeTeam;
var awayTeam;

var roundCounter = 0;

var timerSec = 0;

const metropolitan = ["CAR", "CBJ", "NJD", "NYI", "NYR", "PHI", "PIT", "WSH"];
const atlantic = ["BOS", "BUF", "DET", "FLA", "MTL", "OTT", "TBL", "TOR"];
const central = ["ARI", "CHI", "COL", "DAL", "MIN", "NSH", "STL", "WPG"];
const pacific = ["ANA", "CGY", "EDM", "LAK", "SJS", "SEA", "VAN", "VGK"];
const divisions = ["Atlantic", "Metropolitan", "Central", "Pacific"];
const arrays = [atlantic, metropolitan, central, pacific];

const Eastern = metropolitan.concat(atlantic);
const Western = central.concat(pacific);

function Team(isHome, name, abbr, score, conf, divi, players) {
  this.isTeamHome = isHome;
  this.teamName = name;
  this.teamAbbr = abbr;
  this.teamScore = score;
  this.conference = conf;
  this.division = divi;
  this.teamPlayers = players;
};

function Player(name, score, time) {
  this.name = name;
  this.score = score;
  this.time = time;
};

var highscores = [];

// var exPlayer1 = new Player("P One", 1, 100);
// var exPlayer2 = new Player("P Two", 1, 500);
// var exPlayer3 = new Player("P Three", 1, 100);
// var exPlayer4 = new Player("P Four", 1, 450);
// var exPlayer5 = new Player("P Five", 1, 250);
// var exPlayer6 = new Player("P Six", 2, 10);

// highscores.push(exPlayer1);
// highscores.push(exPlayer2);
// highscores.push(exPlayer3);
// highscores.push(exPlayer4);
// highscores.push(exPlayer5);
// highscores.push(exPlayer6);

// manageHighScores(highscores);


// The ID of the game. The first 4 digits identify the season of the game (ie. 2017 for the 2017-2018 season). The next 2 digits give the type of game, where 01 = preseason, 02 = regular season, 03 = playoffs, 04 = all-star. The final 4 digits identify the specific game number. For regular season and preseason games, this ranges from 0001 to the number of games played. (1271 for seasons with 31 teams (2017 and onwards) and 1230 for seasons with 30 teams). For playoff games, the 2nd digit of the specific number gives the round of the playoffs, the 3rd digit specifies the matchup, and the 4th digit specifies the game (out of 7).



// Loads local storage
function loadLocalStorage() {
  var tempScores = JSON.parse(localStorage.getItem("highscores"));
  if (tempScores !== null) {
    tempScores.forEach(function (object) {
      highscores.push(object);
    });
  }
  manageHighScores(highscores);
}

// Updates local storage
function updateLocalStorage() {
  localStorage.setItem("highscores", JSON.stringify(highscores));
  manageHighScores(highscores);
}

function manageHighScores(arr) {
  console.log(arr);

  arr.sort(function (a, b) {
    var scoreDiff = a.score - b.score; //If a.score is less will be negative
    var timeDiff = a.time - b.time; // If a.time is less will be negative

    if (scoreDiff == 0) {
      return timeDiff;
    } else {
      return scoreDiff;
    }
  });

  if (arr.length > 5) {
    arr = arr.slice(0, 5);
  }

  console.log(arr);
  return arr;
}

function addHighScores() {
  // highscores.forEach(function (player) {
  //   console.log(player.score);
  // })

  for (var i = 0; i < highscores.length; i++) {
    const nameElem = $(`.${i + 1}-fullname`);
    const scoreElem = $(`.${i + 1}-score`);
    const timeElem = $(`.${i + 1}-time`);

    nameElem.text(highscores[i].name);
    scoreElem.text(highscores[i].score);
    timeElem.text(highscores[i].time);
  }
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function startTimer() {
  timerSec = 0;

  var timeInterval = setInterval(function () {
    timerSec++;

    timerElem.text(timerSec);

    if (timerSec === 600 || roundCounter === 5 || (isHomeCorrect && isAwayCorrect)) {
      clearInterval(timeInterval);
    }


  }, 1000)
}

// randomly picks a number for the gameID - this essentially randomly picks a game from the season
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

randomizeGameId();

var allTeamAbbr = [];

allTeamAbbr = Eastern.concat(Western);
allTeamAbbr.sort();


function pullTeamLogo(abbrArray) {

  // var logoURL = `https://assets.nhle.com/logos/nhl/svg/${abbrArray[index]}_light.svg`;
  // var teamLogo = $("<img>");
  // teamLogo.attr("src", logoURL);
  // teamLogo.attr("class", "logo");
  // teamLogo.attr("id", abbrArray[index]);
  // teamLogo.attr("style", "width: 100px; height: 100px");
  // // elem.append(teamLogo);
  // return teamLogo;

  abbrArray.forEach(function (item) {
    var logoURL = `https://assets.nhle.com/logos/nhl/svg/${item}_light.svg`;
    var teamLogo = $("<img>");
    teamLogo.attr("src", logoURL);
    teamLogo.attr("class", "logo");
    teamLogo.attr("id", item);
    teamLogo.attr("style", "width: 100px; height: 100px");
    // elem.append(teamLogo);
    return teamLogo;
  })



}


function addTeamLogos() {
  var logosElem = $(".logos");
  logosElem.empty();
  allTeamAbbr.forEach(function (item) {
    var logoURL = `https://assets.nhle.com/logos/nhl/svg/${item}_light.svg`;
    var teamLogo = $("<img>");
    teamLogo.attr("src", logoURL);
    teamLogo.attr("class", "logo");
    teamLogo.attr("id", item);
    teamLogo.attr("style", "width: 100px; height: 100px");
    // elem.append(teamLogo);
    logosElem.append(teamLogo);
    return teamLogo;
  })

  // var logosIndex = 0;
  // for (var i = 0; i < 4; i++) {
  //   logosElem.append(`
  //   <div class="row team-logo-row-${i}" style="display:flex; flex-wrap: wrap">
  //   </div>`);
  //   // console.log(`Loop ${i} complete`);
  //   var logosRowElem = $(`.team-logo-row-${i}`);
  //   for (var j = 0; j < 2; j++) {
  //     logosRowElem.append(`<div class="d-flex col-6 logos-col-${i}-${j}">
  //     </div>`);
  //     var logosColElem = $(`.logos-col-${i}-${j}`);
  //     // console.log(`Loop ${i}-${j} complete`);
  //     for (var k = 0; k < 4; k++) {
  //       var logoElem = pullTeamLogo(allTeamAbbr, logosIndex);
  //       logosColElem.append(`<div class="logos-box-${i}-${j}-${k}"></div>`);
  //       var logoBoxElem = $(`.logos-box-${i}-${j}-${k}`);
  //       logoBoxElem.append(logoElem);
  //       logosIndex++;
  //       // console.log(logosIndex);
  //       // console.log(`Loop ${i}-${j}-${k} complete`);
  //     }
  //   }
  // }
}


function showLogoClicked(code) {

  var displayLogo = `<img src="https://assets.nhle.com/logos/nhl/svg/${code}_light.svg" class="logo" id="ANA" style="width: 100px; height: 100px">`;
  $("#guessed").append(displayLogo);

  // var displayLogo = pullTeamLogo(allTeamAbbr, allTeamAbbr.indexOf(code));
  // $("#guessed").append(displayLogo);
}



async function addHints() {
  const homeScoreHintElem = $(`#homeScore`);
  const awayScoreHintElem = $(`#awayScore`);
  const homeConfHintElem = $(`#homeConf`);
  const awayConfHintElem = $(`#awayConf`);
  const homeDivHintElem = $(`#homeDivi`);
  const awayDivHintElem = $(`#awayDivi`);
  const homePlayersHintElem = $(`#homePlayers`);
  const awayPlayersHintElem = $(`#awayPlayers`);
  const venueHintElem = $(`#venue`);


  // console.log(homeTeam);

  var teamHints = await teamPromise();
  var homeHints = teamHints[0];
  var awayHints = teamHints[1];
  var venue = teamHints[2];
  console.log(homeHints.teamPlayers)
  console.log(awayHints.teamPlayers)

  // for (var i = 0; i < homeHints.teamPlayers.length; i++) {
  //   console.log(homeHints.teamPlayers[i]);


  //   // var displayLogo = `<img src="https://assets.nhle.com/logos/nhl/svg/${code}_light.svg" class="logo" id="ANA" style="width: 100px; height: 100px">`;
  //   // $("#guessed").append(displayLogo);
  // }

  // var displayLogo = pullTeamLogo(allTeamAbbr, allTeamAbbr.indexOf(code));
  // $("#guessed").append(displayLogo);

  var homePlayersHint = addPlayersToList(homeHints.teamPlayers);
  var awayPlayersHint = addPlayersToList(awayHints.teamPlayers);


  // openModalButtons.forEach(button => {
  //   button.addEventListener('click', () => {
  //     const modal = document.querySelector(button.dataset.modalTarget)
  //     openModal(modal)
  //   })
  // })

  homeScoreHintElem.text(homeHints.teamScore);
  awayScoreHintElem.text(awayHints.teamScore);
  homeConfHintElem.text(homeHints.conference);
  awayConfHintElem.text(awayHints.conference);
  homeDivHintElem.text(homeHints.division);
  awayDivHintElem.text(awayHints.division);
  homePlayersHintElem.append(homePlayersHint);
  awayPlayersHintElem.append(awayPlayersHint);
  venueHintElem.text(venue);
}


function addPlayersToList(playerArr) {
  var playerListElem = $("<ul>");
  playerListElem.attr("style", "list-style-type: none");
  // playerListElem.text("Players");

  console.log(playerArr);

  // for (var x = 0; x < playerArr.length; x++) {
  //   console.log(playerArr[x]);
  // }

  playerArr.forEach(function (player) {
    console.log(player);
    const playerItem = $("<li>");
    playerItem.text(player);
    playerListElem.append(playerItem);
  })

  return playerListElem;

}

function pullFiveRandomItems(arr) {
  let exclusiveArr = [];
  for (var i = 0; i < 5; i++) {
    let length = arr.length;
    // console.log(length);
    let randomIndex = generateRandomNumber(0, length - 1);
    // console.log(randomIndex);
    exclusiveArr.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
    // console.log(arr);
  }

  return exclusiveArr;
}


function checkGameOver() {
  if (roundCounter === 5 || (isHomeCorrect && isAwayCorrect)) {
    $(".buttons").attr("style", "display:none");
    gameBtnsElem.append(`
      <form class="score-submit">
        <h2 class="text-white row justify-content-center">You scored ${roundCounter} with a time of ${timerSec} seconds</h2>
        <h3 class="text-white row justify-content-center">Add your name below</h3>
        <div class="form-row">
          <div class="row justify-content-center">
            <input type="text" class="form-control-first row justify-content-center col-6 col-md-2" placeholder="First name">
          </div>
          <div class="row justify-content-center">
              <input type="text" class="form-control-last row justify-content-center col-6 col-md-2" placeholder="Last name">
          </div>
          <div class="row justify-content-center">
          <button type="button" class="btn btn-success btn-save col-6 col-md-2">Save score</button>
          </div>
        </div>
        
      </form>`);
  }
}

// function store



gameURL += gameID + "/feed/live";

// `https://statsapi.web.nhl.com/api/v1/game/${gameID}/boxscore`

// Might have to define all variables in global scope so that on.click can read them
var homeName;
var homeAbr;
var homeConf;
var homeDivi;
var homeScore;

var awayName;
var awayAbr;
var awayConf;
var awayDivi;
var awayScore;

var teamPromise = () => fetch(gameURL)
  .then(function (response) {
    return response.json();
  })
  .then(async function (data) {
    console.log(data);
    // console.log(dayjs(data.gameData.datetime.dateTime).format("MMM DD, YYYY"))
    // console.log(data.gameData.teams.home.name);
    // console.log(data.gameData.teams.home.abbreviation);
    // console.log(data.gameData.teams.home.conference.name);
    // console.log(data.gameData.teams.home.division.name);
    // console.log(data.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals);

    homeName = (data.gameData.teams.home.name);
    homeAbr = (data.gameData.teams.home.abbreviation);
    homeConf = (data.gameData.teams.home.conference.name);
    homeDivi = (data.gameData.teams.home.division.name);
    homeScore = (data.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals);



    // var homePeople = data.liveData.boxscore.teams.home.onIce;
    var homeSkaters = data.liveData.boxscore.teams.home.skaters;
    var homePeople = pullFiveRandomItems(homeSkaters);
    let homePlayers = await Promise.all(homePeople.map(async function (item) {
      let response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${item}`)

      let data = await response.json();

      // console.log(data);
      let playerName = data.people[0].fullName;
      let playerNumber = data.people[0].primaryNumber;
      // console.log(`${playerNumber} ${playerName}`);

      return `${playerNumber} ${playerName}`
    }))


    homeTeam = new Team(true, homeName, homeAbr, homeScore, homeConf, homeDivi, homePlayers);

    // console.log(data.gameData.teams.away.name);
    // console.log(data.gameData.teams.away.conference.name);
    // console.log(data.gameData.teams.away.division.name);
    // console.log(data.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals);

    awayName = (data.gameData.teams.away.name);
    awayAbr = (data.gameData.teams.away.abbreviation);
    awayConf = (data.gameData.teams.away.conference.name);
    awayDivi = (data.gameData.teams.away.division.name);
    awayScore = (data.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals);


    // var awayPeople = data.liveData.boxscore.teams.away.onIce;
    var awaySkaters = data.liveData.boxscore.teams.away.skaters;
    var awayPeople = pullFiveRandomItems(awaySkaters);
    let awayPlayers = await Promise.all(awayPeople.map(async function (item) {
      let response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${item}`)

      let data = await response.json();

      // console.log(data);
      let playerName = data.people[0].fullName;
      let playerNumber = data.people[0].primaryNumber;
      // console.log(`${playerNumber} ${playerName}`);
      return `${playerNumber} ${playerName}`

    }))

    $("#scoreBox").text(`${homeScore}(H) : ${awayScore}(A)`)
    awayTeam = new Team(false, awayName, awayAbr, awayScore, awayConf, awayDivi, awayPlayers)

    // venue the game took place at
    let venue = (data.gameData.venue.name);
    if (venue === "BB&T Center") {
      venue = "Amerant Bank Arena";
    }
    if (venue === "Pepsi Center") {
      venue = "Ball Arena";
    }

    console.log(venue);
    let venueLink = venue.replaceAll(" ", "+");
    // ADBLOCKER MUST BE DISABLED FOR THIS TO WORK
    $("#googleMap").attr(`src`, `https://www.google.com/maps/embed/v1/place?key=AIzaSyDTxotnfke5TbqtSkPZSB4OkoPgi-cgYsc
        &q=${venueLink}`)

    console.log(awayTeam);
    console.log(homeTeam);

    var gameInfo = [homeTeam, awayTeam, venue];
    return gameInfo;

  })

loadLocalStorage();
addHighScores();
addTeamLogos();
addHints();
startTimer();

// console.log(teamPromise);
// console.log(teamArr[0].teamName);

// the ansArr and count variables make it so the user can only select 2 teams from the choices
var guessedHome;
var guessedAway;
var ansArr = [];
let count = 0;
logosMainElem.on("click", ".logo", function () {
  if (count < 2) {
    var logoClicked = this.id;
    showLogoClicked(logoClicked);
    ansArr.push(this.id);
    count += 1;
  }
  guessedHome = ansArr[0];
  guessedAway = ansArr[1];
});

var checks = [];
var yes = "✅";
var maybe = "❎";
var no = "❌";

var isHomeCorrect = false;
var isAwayCorrect = false;

function checkAnswers() {
  checks = [];
  if (ansArr[0] === homeAbr) {
    checks.push(ansArr[0] + yes);
    isHomeCorrect = true;
  }
  else if (ansArr[0] === awayAbr) {
    checks.push(ansArr[0] + maybe);
  }
  else {
    checks.push(ansArr[0] + no);
  }
  if (ansArr[1] === awayAbr) {
    checks.push(ansArr[1] + yes);
    isAwayCorrect = true;
  }
  else if (ansArr[1] === homeAbr) {
    checks.push(ansArr[1] + maybe);
  }
  else {
    checks.push(ansArr[1] + no);
  }
  ansArr = [];
  $("#guessed").empty();
  checks = checks.toString();
  checks = checks.replace(",", " ");
}

$("#clearAns").on("click", function() {
$("#guessed").empty();
guessedHome = "";
guessedAway = "";
ansArr = [];
count = 0;
})

$("#submitAns").on("click", function () {
  checkAnswers();
  count = 0;
  console.log(checks);
  roundCounter++;
  if (roundCounter === 1) {
    $(".conference").attr("style", "display:show");
    $("#guess1").text(checks);
    logosIndex = 0;
    allTeamAbbr = [];
    if (homeConf === awayConf) {
      if (homeConf === "Western") {
        allTeamAbbr = Western;
      }
      else {
        allTeamAbbr = Eastern;
      }
    }
    else {
      allTeamAbbr = Eastern.concat(Western);
    }
    allTeamAbbr.sort();
    console.log(allTeamAbbr)
    addTeamLogos();
  }
  if (roundCounter === 2) {
    $(".division").attr("style", "display:show");
    $("#guess2").text(checks);
    logosIndex = 0;
    allTeamAbbr = [];
    for (var i = 0; i < divisions.length; i++) {
      if (homeDivi === divisions[i]) {
        allTeamAbbr = arrays[i];
      }
    }
    if (homeDivi != awayDivi) {
      for (i = 0; i < divisions.length; i++) {
        if (awayDivi === divisions[i]) {
          allTeamAbbr = allTeamAbbr.concat(arrays[i]);
        }
      }
    }


    allTeamAbbr.sort();
    console.log(allTeamAbbr)
    addTeamLogos();
  }

  if (roundCounter === 3) {
    $(".players").attr("style", "display:show");
    $("#guess3").text(checks);
  }
  if (roundCounter === 4) {
    $(".location").attr("style", "display:show");
    $("#guess4").text(checks);
  }
  if (roundCounter === 5) {
    $("#guess5").text(checks);
    $(".buttons").attr("style", "display:none");
  }

  checkGameOver();
}
)


gameBtnsElem.on("click", ".btn-save", function () {
  const firstName = $(".form-control-first").val();
  const lastName = $(".form-control-last").val();
  const formElem = $(".score-submit");



  if (firstName === "" || lastName === "") {
    formElem.append(`<p class="text-white">Please add a first and last name.</p>`);
  } else {
    var name = firstName + " " + lastName;

    console.log(firstName);
    console.log(lastName);
    console.log("Save clicked");

    var player = new Player(name, roundCounter, timerSec);
    highscores.push(player);
    updateLocalStorage();
    formElem.remove();
    $("#playAgain").attr("style", "display:show");
  }

})

$("#playAgain").on("click", function() {
  location.reload();
})
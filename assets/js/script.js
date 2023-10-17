const bodyElem = $("body");
const logosMainElem = $(".team-logos");

var gameURL = "https://statsapi.web.nhl.com/api/v1/game/";
var gameID;
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

var homeTeam;
var awayTeam;

var roundCounter = 0;

const metropolitan = ["CAR", "CBJ", "NJD", "NYI", "NYR", "PHI", "PIT", "WSH"];
const atlantic = ["BOS", "BUF", "DET", "FLA", "MTL", "OTT", "TBL", "TOR"];
const central = ["ARI", "CHI", "COL", "DAL", "MIN", "NSH", "STL", "WPG"];
const pacific = ["ANA", "CGY", "EDM", "LAK", "SJS", "SEA", "VAN", "VGK"];

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



// The ID of the game. The first 4 digits identify the season of the game (ie. 2017 for the 2017-2018 season). The next 2 digits give the type of game, where 01 = preseason, 02 = regular season, 03 = playoffs, 04 = all-star. The final 4 digits identify the specific game number. For regular season and preseason games, this ranges from 0001 to the number of games played. (1271 for seasons with 31 teams (2017 and onwards) and 1230 for seasons with 30 teams). For playoff games, the 2nd digit of the specific number gives the round of the playoffs, the 3rd digit specifies the matchup, and the 4th digit specifies the game (out of 7).

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
// THIS NEEDS TO BE RESTRUCTURED
// combines all team abbreviations of the different divisions
function concatArrays(arr1, arr2, arr3, arr4) {
  var arr = arr1.concat(arr2, arr3, arr4);
  arr.sort();
  return arr;
}

var allTeamAbbr = [];

allTeamAbbr = Eastern.concat(Western);
allTeamAbbr.sort();
  

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
  var logosElem = $(".logos");
  

  var logosIndex = 0;

  for (var i = 0; i < 4; i++) {
    logosElem.append(`
    <div class="row team-logo-row-${i}" style="display:flex; flex-wrap: wrap">
    </div>`);
    // console.log(`Loop ${i} complete`);
    var logosRowElem = $(`.team-logo-row-${i}`);
    for (var j = 0; j < 2; j++) {
      logosRowElem.append(`<div class="d-flex col-6 logos-col-${i}-${j}">
      </div>`);
      var logosColElem = $(`.logos-col-${i}-${j}`);
      // console.log(`Loop ${i}-${j} complete`);
      for (var k = 0; k < 4; k++) {
        var logoElem = pullTeamLogo(allTeamAbbr, logosIndex);
        logosColElem.append(`<div class="logos-box-${i}-${j}-${k}"></div>`);
        var logoBoxElem = $(`.logos-box-${i}-${j}-${k}`);
        logoBoxElem.append(logoElem);
        logosIndex++;
        // console.log(logosIndex);
        // console.log(`Loop ${i}-${j}-${k} complete`);
      }
    }
  }
}

function showLogoClicked(code) {
  
    var displayLogo = pullTeamLogo(allTeamAbbr, allTeamAbbr.indexOf(code));
    $("#guessed").append(displayLogo);
  }



openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal){
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

// function store

randomizeGameId();

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

fetch(gameURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(dayjs(data.gameData.datetime.dateTime).format("MMM DD, YYYY"))
    console.log(data.gameData.teams.home.name);
    console.log(data.gameData.teams.home.abbreviation);
    console.log(data.gameData.teams.home.conference.name);
    console.log(data.gameData.teams.home.division.name);
    console.log(data.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals);

    homeName = (data.gameData.teams.home.name);
    homeAbr = (data.gameData.teams.home.abbreviation);
    homeConf = (data.gameData.teams.home.conference.name);
    homeDivi = (data.gameData.teams.home.division.name);
    homeScore = (data.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals);
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

    console.log(data.gameData.teams.away.name);
    console.log(data.gameData.teams.away.conference.name);
    console.log(data.gameData.teams.away.division.name);
    console.log(data.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals);

    awayName = (data.gameData.teams.away.name);
    awayAbr = (data.gameData.teams.away.abbreviation);
    awayConf = (data.gameData.teams.away.conference.name);
    awayDivi = (data.gameData.teams.away.division.name);
    awayScore = (data.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals);
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

    $("#scoreBox").text(`${homeScore}(H) : ${awayScore}(A)`)
    awayTeam = new Team(false, awayName, awayAbr, awayScore, awayConf, awayDivi, awayPlayers)

    // venue the game took place at
    let venue = (data.gameData.venue.name);
    console.log(venue);
    let venueLink = venue.replaceAll(" ", "+");
    // ADBLOCKER MUST BE DISABLED FOR THIS TO WORK
    $("body").append(`
    <iframe
      style="display: none"
      width="500"
      height="300"
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

function checkAnswers() {
  checks = [];
  if (ansArr[0] === homeAbr) {
    checks.push(yes);
  }
  else if (ansArr[0] === awayAbr) {
    checks.push(maybe);
  }
  else {
    checks.push(no);
  }
  if (ansArr[1] === awayAbr) {
    checks.push(yes);
  }
  else if (ansArr[1] === homeAbr) {
    checks.push(maybe);
  }
  else {
    checks.push(no);
  }
  ansArr = [];
  $("#guessed").empty();
  checks = checks.toString();
  checks = checks.replace(",", " ");
}

$("#submitAns").on("click", function() {
  checkAnswers();
  count = 0;
  roundCounter++;
  console.log(checks);
  console.log(window[homeConf])
  // if (roundCounter === 1) {
  //   logosIndex = 0;
  //   allTeamAbbr = [];
  //   if (homeConf === awayConf) {
  //     if (homeConf === "Western"){
  //       allTeamAbbr = Western;
  //     }
  //     else {
  //       allTeamAbbr = Eastern;
  //     }
  //   } 
  //   else {
  //     allTeamAbbr = Eastern.concat(Western);
  //   }
  //   $(".team-logos").empty();
  //   console.log(allTeamAbbr)
  //   addTeamLogos();


  // }
})

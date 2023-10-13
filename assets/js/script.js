var gameID;
var gameURL = "https://statsapi.web.nhl.com/api/v1/game/";

// The ID of the game. The first 4 digits identify the season of the game (ie. 2017 for the 2017-2018 season). The next 2 digits give the type of game, where 01 = preseason, 02 = regular season, 03 = playoffs, 04 = all-star. The final 4 digits identify the specific game number. For regular season and preseason games, this ranges from 0001 to the number of games played. (1271 for seasons with 31 teams (2017 and onwards) and 1230 for seasons with 30 teams). For playoff games, the 2nd digit of the specific number gives the round of the playoffs, the 3rd digit specifies the matchup, and the 4th digit specifies the game (out of 7).
function randomizeGameId() {
  var gameYear;
  var gameType;
  var gameNumber;

  gameYear = prompt("What year would you like to play from?");
  gameType = "02";
  gameNumber = generateRandomNumber(1, 1271);
  gameNumber = gameNumber.toString().padStart(4, '0');
  // if (gameNumber >= 1 && gameNumber <= 9) {
  //   gameNumber = "000" + gameNumber;
  // } else if (gameNumber >= 10 && gameNumber <= 99) {
  //   gameNumber = "00" + gameNumber;
  // } else if (gameNumber >= 100 && gameNumber <= 999) {
  //   gameNumber = "0" + gameNumber;
  // }

  gameID = gameYear + gameType + gameNumber;
  console.log(gameID);
  return gameID;
}

// let number = 2
// let result = number.toString().padStart(5, '0')
// console.log(result); // 00002

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

randomizeGameId();

gameURL += gameID + "/boxscore";

// `https://statsapi.web.nhl.com/api/v1/game/${gameID}/boxscore`

fetch(gameURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })



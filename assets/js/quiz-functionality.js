

function team(isHome, name, score, conf, divi, players) {
  this.isTeamHome = isHome;
  this.teamName = name;
  this.teamScore = score;
  this.conference = conf;
  this.division = divi;
  this.teamPlayers = players;
};

var venue = "Amalie Arena";

var homeTeam = team(true, "Toronto Maple Leafs", 3, "Eastern", "Atlantic", ["Matt", "Sushi", "Tim", "Tucker", "Yacob"]);
var awayTeam = team(false, "Tampa Bay Lightning", 4, "Eastern", "Atlantic", ["Matt", "Sushi", "Tim", "Tucker", "Yacob"]);

/*
  1. Player will get home and away score
  2. Player will guess home team and away team
    a. If they are wrong, they will get info on if either of the guesses played in that game and move on to the next hint
    b. If they are right, they will win and get a score based on how many hints they went through
*/



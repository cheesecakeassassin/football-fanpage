var standingsTable = document.querySelector(".table-info");
var leaguesDropdown = document.querySelector("#leagues");
var yearsDropdown = document.querySelector("#years");
var selectVid = document.querySelector("#vid");

var leagueId = localStorage.getItem("leagueId");
var year = 2021;

var highlightsApi = "https://www.scorebat.com/video-api/v3/";
var standingsApi =
  " https://api-football-standings.azharimm.site/leagues/" +
  leagueId +
  "/standings?season=" +
  year +
  "&sort=asc";
var leagueApi = " https://api-football-standings.azharimm.site/leagues";

// Fetches the API that shows football league standings from different competitions
fetch(standingsApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Creates variable to make the API values easier for humans to understand
    var standingsInfo = data.data.standings;

    // Iterates through every team in the selected league in order to create table of stats
    for (var i = 0; i < standingsInfo.length; i++) {
      // Creates a row in the table for a new team
      var teamEl = document.createElement("tr");
      teamEl.className = standingsInfo[i];

      // Creates an element on the row for each of the team's stats
      var position = document.createElement("th");
      var teamName = document.createElement("td");
      var played = document.createElement("td");
      var wins = document.createElement("td");
      var draws = document.createElement("td");
      var losses = document.createElement("td");
      var goalsFor = document.createElement("td");
      var goalsAgainst = document.createElement("td");
      var goalDifference = document.createElement("td");
      var points = document.createElement("td");

      // Gets the team's stats from the API and inserting them where they go
      position.textContent = i + 1; // Gets index and adds 1 to get team's league position
      teamName.textContent = standingsInfo[i].team.name;
      played.textContent = standingsInfo[i].stats[3].value;
      wins.textContent = standingsInfo[i].stats[0].value;
      draws.textContent = standingsInfo[i].stats[2].value;
      losses.textContent = standingsInfo[i].stats[1].value;
      goalsFor.textContent = standingsInfo[i].stats[4].value;
      goalsAgainst.textContent = standingsInfo[i].stats[5].value;
      goalDifference.textContent = standingsInfo[i].stats[9].value;
      points.textContent = standingsInfo[i].stats[6].value;

      // Appends team's stats to the new row
      teamEl.appendChild(position);
      teamEl.appendChild(teamName);
      teamEl.appendChild(played);
      teamEl.appendChild(wins);
      teamEl.appendChild(draws);
      teamEl.appendChild(losses);
      teamEl.appendChild(goalsFor);
      teamEl.appendChild(goalsAgainst);
      teamEl.appendChild(goalDifference);
      teamEl.appendChild(points);

      // Adding completed team row to the table
      standingsTable.appendChild(teamEl);
    }
  });

// leaguesDropdown downdrop
fetch(leagueApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Creates variable to make the API values easier for humans to understand
    var leagueInfo = data.data;

    for (var i = 0; i < leagueInfo.length; i++) {
      if (i == 5 || i == 6 || i == 7 || i == 9 || i == 13 || i == 16) {
        var listOption = document.createElement("option");

        listOption.id = leagueInfo[i].id;
        listOption.value = leagueInfo[i].id;
        listOption.textContent = leagueInfo[i].name;

        leaguesDropdown.appendChild(listOption);
      }
    }
  });

const mySel = document.querySelector("#leagues");
mySel.addEventListener("change", function () {
  localStorage.setItem("leagueId", this.value);
  let val = localStorage.getItem("leagueId");
  if (val) mySel.value = val; // set the dropdown
  leagueId = val;

  leagueSelection();
});

function leagueSelection() {
  standingsTable.innerHTML = "";
  
  standingsApi =
  " https://api-football-standings.azharimm.site/leagues/" +
  leagueId +
  "/standings?season=" +
  year +
  "&sort=asc";
  console.log(standingsApi);

  fetch(standingsApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Creates variable to make the API values easier for humans to understand
      var standingsInfo = data.data.standings;

      // Iterates through every team in the selected league in order to create table of stats
      for (var i = 0; i < standingsInfo.length; i++) {
        // Creates a row in the table for a new team
        var teamEl = document.createElement("tr");
        teamEl.className = standingsInfo[i];

        // Creates an element on the row for each of the team's stats
        var position = document.createElement("th");
        var teamName = document.createElement("td");
        var played = document.createElement("td");
        var wins = document.createElement("td");
        var draws = document.createElement("td");
        var losses = document.createElement("td");
        var goalsFor = document.createElement("td");
        var goalsAgainst = document.createElement("td");
        var goalDifference = document.createElement("td");
        var points = document.createElement("td");

        // Gets the team's stats from the API and inserting them where they go
        position.textContent = i + 1; // Gets index and adds 1 to get team's league position
        teamName.textContent = standingsInfo[i].team.name;
        played.textContent = standingsInfo[i].stats[3].value;
        wins.textContent = standingsInfo[i].stats[0].value;
        draws.textContent = standingsInfo[i].stats[2].value;
        losses.textContent = standingsInfo[i].stats[1].value;
        goalsFor.textContent = standingsInfo[i].stats[4].value;
        goalsAgainst.textContent = standingsInfo[i].stats[5].value;
        goalDifference.textContent = standingsInfo[i].stats[9].value;
        points.textContent = standingsInfo[i].stats[6].value;

        // Appends team's stats to the new row
        teamEl.appendChild(position);
        teamEl.appendChild(teamName);
        teamEl.appendChild(played);
        teamEl.appendChild(wins);
        teamEl.appendChild(draws);
        teamEl.appendChild(losses);
        teamEl.appendChild(goalsFor);
        teamEl.appendChild(goalsAgainst);
        teamEl.appendChild(goalDifference);
        teamEl.appendChild(points);

        // Adding completed team row to the table
        standingsTable.appendChild(teamEl);
      }
    });
}
// window.onload = function() {
//   document.querySelector("option").addEventListener("click", leagueSelection);
// }

/////////////////////widget
var objDiv1 = document.getElementById("widget1");
var objDiv2 = document.getElementById("widget2");
objDiv1.scrollTop = objDiv1.scrollHeight;
objDiv2.scrollTop = objDiv2.scrollHeight;
//////////////////////////
//localStorage
//var preferedLeague = {'eng': 'English Premier', 'fra':'Leaguefrance ligue 1','ger': 'German Bundesliga', 'ita' : 'Italian Serie A','por' :'Portuguese Liga','spa': 'Spanish Primera Division'}
//var eng = 'English Premier League';
//var fra = 'france ligue 1';
//var ger = 'German Bundesliga' ;
//var ita = 'Italian Serie A';
//var por ='Portuguese Liga';
// var spa = 'Spanish Primera Division'
var storage = document.querySelector(".store");
//localStorage.setItem("eng", "English Premier League");
var retrievedObject = localStorage.getItem("a");
document.querySelector(".box").onclick = function (event) {
  var a = event.target.innerHTML;
  console.log(a);
  localStorage.setItem("a", JSON.stringify(a));

  console.log("retrievedObject: ", JSON.parse(retrievedObject));
  var listPl = document.createElement("button");
  listPl.className = "button is-black is-rounded is-outlined btns";
  listPl.textContent = a;
  storage.appendChild(listPl);
};
function myFunction() {
  var listPl = document.createElement("button");
  listPl.className = "button is-black is-rounded is-outlined btns";
  listPl.textContent = retrievedObject;
  storage.appendChild(listPl);
}

myFunction();

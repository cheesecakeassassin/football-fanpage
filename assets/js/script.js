var standingsTable = document.querySelector(".table-info");
var leaguesDropdown = document.querySelector("#leagues");
var yearsDropdown = document.querySelector("#years");
var selectVid = document.querySelector("#vid");

var leagueId = localStorage.getItem("leagueId");
var preferredLeagueId;

var year = localStorage.getItem("year");
const yearsArray = [
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
];

var highlightsApi = "https://www.scorebat.com/video-api/v3/";
var standingsApi =
  " https://api-football-standings.azharimm.site/leagues/" +
  leagueId +
  "/standings?season=" +
  year +
  "sort=asc";
var leagueApi = " https://api-football-standings.azharimm.site/leagues";

function createYearDropdownOptions() {
  for (var i = 0; i < yearsArray.length; i++) {
    var yearOption = document.createElement("option");
    yearOption.textContent = yearsArray[i];

    yearsDropdown.appendChild(yearOption);
  }
}

// Handles click events on the year dropdown
const yearDropdownSelection = yearsDropdown;
yearDropdownSelection.addEventListener("change", function () {
  localStorage.setItem("year", this.value);
  let val = localStorage.getItem("year");
  if (val) yearDropdownSelection.value = val; // set the dropdown

  year = val;

  leagueSelection();
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

// Handles click events on the league dropdown
const leagueDropdownSelection = leaguesDropdown;
leagueDropdownSelection.addEventListener("change", function () {
  localStorage.setItem("leagueId", this.value);
  let val = localStorage.getItem("leagueId");
  if (val) leagueDropdownSelection.value = val; // set the dropdown
  // Keeps the league standings consistent with the "Preferred League" after refreshing
  if (leagueId != null) {
    preferredLeagueId = leagueId;
    localStorage.setItem("leagueId", preferredLeagueId);
  }

  leagueId = val;

  leagueSelection();
});

// Function that selects league and displays stats
function leagueSelection() {
  standingsTable.innerHTML = "";

  if (year == null) {
    localStorage.setItem("year", 2021);
    year = 2021; // current season
  }

  standingsApi =
    " https://api-football-standings.azharimm.site/leagues/" +
    leagueId +
    "/standings?season=" +
    year +
    "&sort=asc";

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

var storage = document.querySelector(".store");
var retrievedObject = localStorage.getItem("leagueName");

function modalEventHandler() {
  var listPl = document.createElement("button");
  listPl.className = "button is-black is-rounded is-outlined btns";

  if (retrievedObject != null) {
    listPl.textContent = retrievedObject;
    storage.appendChild(listPl);
  }

  document.querySelector(".box").onclick = function (event) {
    var leagueName = event.target.innerHTML;
    leagueId = event.target.id;
    localStorage.setItem("leagueId", leagueId);
    localStorage.setItem("leagueName", leagueName);

    listPl.textContent = leagueName;
    storage.appendChild(listPl);

    leagueSelection();
  };
}

// Script for modal in the footer
const modal = document.querySelector(".modal");
const btn = document.querySelector("#btn");
const close1 = document.querySelector(".btn1");
const close2 = document.querySelector(".btn2");
const close3 = document.querySelector(".btn3");
const close4 = document.querySelector(".btn4");
const close5 = document.querySelector(".btn5");
const close6 = document.querySelector(".btn6");

btn.addEventListener("click", function () {
  modal.style.display = "block";
});

close1.addEventListener("click", function () {
  modal.style.display = "none";
});
close2.addEventListener("click", function () {
  modal.style.display = "none";
});
close3.addEventListener("click", function () {
  modal.style.display = "none";
});
close4.addEventListener("click", function () {
  modal.style.display = "none";
});
close5.addEventListener("click", function () {
  modal.style.display = "none";
});
close6.addEventListener("click", function () {
  modal.style.display = "none";
});
window.addEventListener("click", function (event) {
  if (event.target.className === "modal-background") {
    modal.style.display = "none";
  }
});

// Functions to run at the start
createYearDropdownOptions()
leagueSelection();
modalEventHandler();

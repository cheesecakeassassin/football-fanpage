var standingsTable = document.querySelector(".table-info");
var leaguesDropdown = document.querySelector("#leagues");
var selectVid = document.querySelector("#vid");

var leagueId = localStorage.getItem("leagueId");

var highlightsApi = "https://www.scorebat.com/video-api/v3/";
var standingsApi =
  " https://api-football-standings.azharimm.site/leagues/" +
  leagueId +
  "/standings?season=2021&sort=asc";
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
  "/standings?season=2021&sort=asc";
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

var storage = document.querySelector(".store");
var retrievedObject = localStorage.getItem("leagueName");
document.querySelector(".box").onclick = function (event) {
  var leagueName = event.target.innerHTML;
  localStorage.setItem("leagueName", JSON.stringify(leagueName));

  console.log("retrievedObject: ", JSON.parse(retrievedObject));
  var listPl = document.createElement("button");
  listPl.className = "button is-black is-rounded is-outlined btns";
  listPl.textContent = leagueName;
  storage.appendChild(listPl);
};

// Script for modal in the footer
const modal = 
            document.querySelector('.modal');
    const btn = 
            document.querySelector('#btn')
      const close1 = 
            document.querySelector('.btn1')
      const close2 = 
            document.querySelector('.btn2')
      const close3 = 
            document.querySelector('.btn3')
      const close4 = 
            document.querySelector('.btn4')
      const close5 = 
            document.querySelector('.btn5')
      const close6 = 
            document.querySelector('.btn6')
      const close7 = 
            document.querySelector('.btn2')  
    
      btn.addEventListener('click',
                           function () {
        modal.style.display = 'block'
        
      })
      
      close1.addEventListener('click',
                             function () {
        modal.style.display = 'none'
      })
      close2.addEventListener('click',
                             function () {
        modal.style.display = 'none'
      })
      close3.addEventListener('click',
                             function () {
        modal.style.display = 'none'
      })
      close4.addEventListener('click',
                             function () {
        modal.style.display = 'none'
      })
      close5.addEventListener('click',
                             function () {
        modal.style.display = 'none'
      })
      close6.addEventListener('click',
                             function () {
        modal.style.display = 'none'
      })
      window.addEventListener('click',
                              function (event) {
        if (event.target.className === 
            'modal-background') {
          modal.style.display = 'none'
        }
      })
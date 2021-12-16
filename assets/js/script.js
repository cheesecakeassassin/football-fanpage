// API variables
var highlightsApi = "https://www.scorebat.com/video-api/v3/";
var leagueApi = " https://api-football-standings.azharimm.site/leagues";
var standingsApi =
    " https://api-football-standings.azharimm.site/leagues/" +
    leagueId +
    "/standings?season=" +
    year +
    "sort=asc";

// Variables for 'Standings' section of page including the table and dropdown menus
var standingsTable = document.querySelector(".table-info");
var leaguesDropdown = document.querySelector("#leagues");
var yearsDropdown = document.querySelector("#years");

// Variables for dynamically changing the URL of standingsApi
var preferredLeagueId = localStorage.getItem("preferredLeague"); // Used to separately store which league is the user's favorite
var leagueId = localStorage.getItem("preferredLeague"); // Keeps the league standings consistent with the "Preferred League" after refreshing
var retrievedObject = localStorage.getItem("leagueName");
var year = localStorage.getItem("year");

// Constant to declare an array of the years users can select in the dropdown
const yearsArray = ["2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006"];

// Variable that contains the favorite league button found on the footer of the page
var favoriteLeagueButton = document.querySelector(".favorite-league-button");

// Variables holding highlights and scores widgets
var highlightsWidget = document.querySelector("#highlights-widget");
var scoresWidget = document.querySelector("#scores-widget");

// Sets the scroll for the highlights and scores widgets
highlightsWidget.scrollTop = highlightsWidget.scrollHeight;
scoresWidget.scrollTop = scoresWidget.scrollHeight;

// Function that creates dropdown options for the years dropdown using yearsArray
function createYearDropdownOptions() {
    for (var i = 0; i < yearsArray.length; i++) {
        var yearOption = document.createElement("option");
        yearOption.textContent = yearsArray[i];

        yearsDropdown.appendChild(yearOption);
    }
}

// Event listener that stores which year was clicked in the years dropdown
const yearDropdownSelection = yearsDropdown;
yearDropdownSelection.addEventListener("change", function () {
    localStorage.setItem("year", this.value);
    year = localStorage.getItem("year");
    if (year) {
        yearDropdownSelection.value = year;
    }
    leagueSelection(); // Changes standings table to reflect chosen year
});

// Fetches API to create league dropdown for only the top 5 leagues
fetch(leagueApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Creates variable to make the API values easier for humans to understand
        var leagueInfo = data.data;

        // Specific numbers chosen because they represent the most popular leagues in the API
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
    leagueId = localStorage.getItem("leagueId");
    if (leagueId) {
        leagueDropdownSelection.value = leagueId;
    }
    leagueSelection(); // Changing standings table to reflect selected league
});

// Function that creates standings table with stats using league and year chosen by user
function leagueSelection() {
    // Clears table before creating a new one
    standingsTable.innerHTML = "";

    // If no year is yet to be chosen, it defaults to the 2021 season
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

                // Adding class name to goals for, goals against, and goal difference for shrinking table for mobile
                goalsFor.classList.add("goals-for");
                goalsAgainst.classList.add("goals-against");
                goalDifference.classList.add("goal-difference");

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

// Function to handle selection of a team in the modal and displaying preferred team
function modalEventHandler() {
    var listPl = document.createElement("button");
    listPl.className = "button is-danger is-rounded btns";

    // If user hasn't chosen a preferred league yet, a blank button will not show up
    if (retrievedObject != null) {
        listPl.textContent = retrievedObject;
        favoriteLeagueButton.appendChild(listPl);
    }
    // Event listener that checks which league was chosen and stores it in local storage
    document.querySelector(".box").onclick = function (event) {
        var leagueName = event.target.innerHTML;
        preferredLeagueId = event.target.id;
        leagueId = preferredLeagueId;

        // Storing values to local storage
        localStorage.setItem("preferredLeague", preferredLeagueId);
        localStorage.setItem("leagueId", preferredLeagueId);
        localStorage.setItem("leagueName", leagueName);

        listPl.textContent = leagueName;
        favoriteLeagueButton.appendChild(listPl);

        leagueSelection(); // Changes standing table to reflect selected league
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

// Script for widgets (provided by API)
(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://www.scorebat.com/embed/embed.js?v=arrv";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "scorebat-jssdk");

// Functions to run at the start
createYearDropdownOptions();
leagueSelection();
modalEventHandler();

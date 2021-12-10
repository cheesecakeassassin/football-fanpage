var selectOne = document.querySelector(".one");
var selectTwo = document.querySelector("#two");
var selectLeague = document.querySelector("#three");
var selectVid = document.querySelector("#vid");

var leagueId = "eng.1"; // The default league shown is the English Premier League

var highlightsApi = "https://www.scorebat.com/video-api/v3/";
var standingsApi =
  " https://api-football-standings.azharimm.site/leagues/" +
  leagueId +
  "/standings?season=2021&sort=asc";
var leagueApi = " https://api-football-standings.azharimm.site/leagues";

fetch(highlightsApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("Highlights \n----------");

    // TODO: Loop through the response
    for (var i = 0; i < 3; i++) {
      var competitions = data.response[i].competition;
      var listOption2 = document.createElement("option");
      listOption2.textContent = competitions;
      selectTwo.appendChild(listOption2);

      var video = data.response[i].videos[0].embed;
      var listVideo = document.createElement("div");

      listVideo.innerHTML = video;
      selectVid.appendChild(listVideo);

      console.log(data.response[i].videos[0]);
    }
  });

fetch(standingsApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("Standings \n----------");
    console.log(data);

    for (var i = 0; i < data.data.standings.length; i++) {
      //console.log (data.data.standings[i])
      var standings = data.data.standings[i].team.name;
      var listItem = document.createElement("li");
      listItem.textContent = standings;
      selectOne.appendChild(listItem);
    }
  });

// selectLeague downdrop
fetch(leagueApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.data);

    // TODO: Loop through the response
    for (var i = 0; i < data.data.length; i++) {
      var leagues = data.data[i].name;
      var listOption = document.createElement("option");
      listOption.textContent = leagues;
      selectLeague.appendChild(listOption);
    }
  });

var count = 0;

// TODO: Add a comment describing the functionality of the following document.querySelector() methods:
// Initializing variables for the event listener (increment, decrement, count)
var incrementEl = document.querySelector("#increment");
var decrementEl = document.querySelector("#decrement");
var countEl = document.querySelector("#count");

// TODO: Add a comment describing the functionality of the following code:
// Sets countEl element with count variable which was previously initialized as 0
function setCounterText() {
  countEl.textContent = leagueId;
}
// TODO: Add a comment describing the functionality of the following event listener:
// Event listener for incrementing the count when increment is clicked
incrementEl.addEventListener("click", function () {
  count++;
  setCounterText();
});

// TODO: Add a comment describing the functionality of the following event listener:
// Event listener for decrementing the count when decrement is clicked
decrementEl.addEventListener("click", function () {
  // Action will fire if count is greater than  0
  if (count > 0) {
    count--;
    setCounterText();
  }
});

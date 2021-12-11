var selectOne = document.querySelector(".one");
var selectTwo = document.querySelector("#two");
var selectLeague = document.querySelector("#three");
var selectVid = document.querySelector("#vid");

var leagueId = "eng.1"; // The default league shown is the English Premier League
var year = "2021"; // The default year will be 2021
var leagues;
var listOption;

var highlightsApi = "https://www.scorebat.com/video-api/v3/";
var standingsApi =
  " https://api-football-standings.azharimm.site/leagues/" +
  leagueId +
  "/standings?season=" + year + "&sort=asc";
var leagueApi = " https://api-football-standings.azharimm.site/leagues";

/*fetch(highlightsApi)
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
  });*/

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
    console.log("Leagueeeeeee");
    console.log(data.data);

    // TODO: Loop through the response
    for (var i = 0; i < data.data.length; i++) {
      if (i == 5 || i == 6 || i == 7 || i == 9 || i == 13 || i == 16) {
        leagues = data.data[i].name;
        listOption = document.createElement("option");
        listOption.textContent = leagues;
        selectLeague.appendChild(listOption);
      }
    }
  });
/////////////////////widget
  var objDiv1 = document.getElementById("widget1");
  var objDiv2= document.getElementById("widget2");
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
  var storage = document.querySelector ('.store')
  //localStorage.setItem("eng", "English Premier League");
  var retrievedObject = localStorage.getItem('a');
  document.querySelector('.box').onclick = function(event) {
    var a = event.target.innerHTML;
    console.log(a);
    localStorage.setItem('a', JSON.stringify(a));
    

  console.log('retrievedObject: ', JSON.parse(retrievedObject));
  var listPl =document.createElement('button');
  listPl.textContent=a;
  storage.appendChild(listPl);
  };
  function myFunction() {
    var listPl =document.createElement('button');
    listPl.textContent= retrievedObject;
    storage.appendChild(listPl);
  }
  
  myFunction();
// Put the object into storage
//localStorage.setItem('preferedLeague', JSON.stringify(preferedLeague));

  //let setEng= localStorage.setItem("pLeague","a");
//console.log(pLeague);
//let getEng= localStorage.getItem("eng");
//console.log (getEng);
//var listStorage = document.createElement("P");
       // listStorage.textContent = eng;
       // storage.appendChild(listStorage);
//console.log(getEng);
////localStorage.removeItem("tech");
//To confirm it was removed, try to retrieve it once more:

//console.log(localStorage.getItem("tech"));
//To remove all the data stored in LocalStorage, use the clear() function:

//localStorage.clear();
//The key() function allows us to retrieve the key of an item saved in LocalStorage by its index. The browser creates an integer index for each item added to LocalStorage.

//As we don't generate this index, we should not use the index to retrieve keys directly. However, we can use this function to get all keys stored in LocalStorage:

//for (let i = 0; i < localStorage.length; i++) {
   // let storedValue = localStorage.key(i);
    //console.log(`Item at ${i}: ${storedValue}`);
//}

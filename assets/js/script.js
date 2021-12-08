var selectOne = document.querySelector('.one')
var selectTwo = document.querySelector('#two')
var selectLeague = document.querySelector("#three")
var selectVid = document.querySelector("#vid")
var highlightsApi = 'https://www.scorebat.com/video-api/v3/';
var standingsApi = ' https://api-football-standings.azharimm.site/leagues/eng.1/standings?season=2021&sort=asc';
var leagueApi =' https://api-football-standings.azharimm.site/leagues';
var standingsLeagueApi = ' https://api-football-standings.azharimm.site/leagues';



fetch(highlightsApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Highlights \n----------');
   

    // TODO: Loop through the response
    for (var i = 0; i < data.response.length; i++)
    {
      var competitions = data.response[i].competition;
      var listOption2 = document.createElement('option');
      listOption2.textContent = competitions;
      selectTwo.appendChild(listOption2);
      //////
      var video = data.response[i].videos[0].embed;
      var listVideo = document.createElement('div');
      //console.log(video)
       /*listVideo.innerHTML=`<video width="320" height="240" controls>
       <source src="${video}" type="video/mp4">
       <source src="${video}" type="video/ogg">
       Your browser does not support the video tag.
     </video>`;*/
     listVideo.innerHTML=video;
       selectVid.appendChild(listVideo);
       

      console.log(data.response[i].videos[0]);
      
    }
  });

  fetch(standingsApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Standings \n----------');
    console.log(data);
    //console.log(data);
    //console.log(data.data.standings);

    for (var i = 0; i < data.data.standings.length; i++)
    {
      //console.log (data.data.standings[i])
      var standings =data.data.standings[i].team.name;
      var listItem =document.createElement('li');
      listItem.textContent = standings;
      selectOne.appendChild(listItem);
    //console.log(data.data.standings[i].team);
    //console.log(data.data.standings[i].team.name);
    }
  });

// selectLeague downdrop
fetch(leagueApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
   //console.log(data.data);

    // TODO: Loop through the response
    for (var i = 0; i < data.data.length; i++)
    {

      //console.log(data.data[i].slug);
      
      var leagues =data.data[i].name;
      var listOption =document.createElement('option')
      listOption.textContent = leagues;
       firstLeague.appendChild(listOption);
       
  
    }
  });

  fetch(standingsLeagueApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
   //console.log(data.data);

    // TODO: Loop through the response
    for (var i = 0; i < data.data.length; i++)
    {

      console.log(data.data[i].slug);
      
      var leagues =data.data[i].name;
      var listOption =document.createElement('option')
      listOption.textContent = leagues;
       secondLeague.appendChild(listOption);
       
  
    }
  });
  
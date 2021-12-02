var highlightsApi = 'https://www.scorebat.com/video-api/v3/';
var standingsApi = 'https://api-football-standings.azharimm.site/leagues/eng.1/standings?season=2020&sort=asc&per_page=5';

fetch(highlightsApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Highlights \n----------');
    console.log(data);

    // TODO: Loop through the response
    for (var i = 0; i < data.response.length; i++)
    {
    // TODO: Console log each issue's URL and each user's login
    console.log(data.response[i].title);
    }
  });

  fetch(standingsApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Standings \n----------');
    console.log(data);
    console.log(data.data.standings);

    for (var i = 0; i < data.data.standings.length; i++)
    {
    console.log(data.data.standings[i].team.name);
    }
  });
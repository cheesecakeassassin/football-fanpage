var requestUrl = 'https://api-football-standings.azharimm.site/leagues/eng.1/standings?season=2021&sort=asc';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Standings \n----------');
    console.log(data);
    // TODO: Loop through the response
    // for (var i = 0; i < data.length; i++)
    // {
    // // TODO: Console log each issue's URL and each user's login
    // console.log(data[i]);
    // console.log(data[i].user.login);
    // }
  });
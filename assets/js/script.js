var requestUrl = 'https://www.scorebat.com/video-api/v3/';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Standings \n----------');
    console.log(data);

    // TODO: Loop through the response
    for (var i = 0; i < data.response.length; i++)
    {
    // TODO: Console log each issue's URL and each user's login
    console.log(data.response[i].title);
    }
  });
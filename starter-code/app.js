const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.set('view engine', 'ejs');

app.set('views', 'views');


//layout stuff--------------------------------------------
app.use(express.static('public'));
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout,', 'layout.ejs');
//---------------------------------------------------------

//ROUTES--------------------------------------------------
app.get('/', (req, res, next) => {
  res.render('home-views.ejs');
});
//stage 1 of random
app.get('/random', (req, res, next) => {

  client.getRandomJoke().then((jokeInfo) => {
    let randJoke = jokeInfo.value;

    res.render('random-jokes-views.ejs', {
      myJoke: randJoke
    });
  });

});

app.get('/categories', (req, res, next) => {

client.getJokeCategories()
  .then((response)=>  {
    // use the response here
    res.render('categories.ejs',{
      categoriesList: response
    });

  })
  .catch((err)=> {
    // handle error

  });
});

app.get('/search', (req, res, next) => {
  client.search(searchTerm)
    .then((response) => {
      // to stuff here
      res.render('search-views.ejs', {
        searchJoke: response
      });
    }).catch((err) => {
      // handle error
    });
});

//--------------------------------------------------------



app.listen(3000);

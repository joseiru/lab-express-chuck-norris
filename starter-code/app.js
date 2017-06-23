const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/random', (req, res, next) => {
    // Retrieve a random chuck joke
    client.getRandomJoke()
        .then((response) => {
        res.send(response.value);
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/categories', (req, res, next) => {
    if (req.query.cat) {
        let cat = req.query.cat;
        client.getRandomJoke(cat)
            .then((response) => {
            res.send(response.value);
        }).catch((err) => {
            console.log(err);
        });
    } else {
        client.getJokeCategories()
            .then((response) => {
            let data = {categories: response};
            res.render("joke-by-category", data);
        }).catch((err) => {
            console.log(err);
        });
    }
});

app.get('/search', (req, res, next) => {
    res.render('search-form');
});

app.post('/search', (req, res, next) => {
    let searchTerm = req.body.searchTerm;
    client.search(searchTerm)
        .then((response) => {
        res.send(response,value);
    }).catch((err) => {
        console.log(err);
    });
});

app.listen(3000,() => {
    console.log("Listening on port 3000");
});


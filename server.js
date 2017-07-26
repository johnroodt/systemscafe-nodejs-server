const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
// add support for partials
hbs.registerPartials(__dirname + '/views/partials');

//key-value pair
app.set('view engine', hbs);

// next allows you to tell Express, when your function is done
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// Uncomment when in maintenance mode
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// Some express middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Set up HTTP request handlers
app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeTitle: 'Systems Cafe',
        pageTitle: 'Enter Systems Cafe',
        welcomeMessage: 'Welcome to systems cafe - the home of business gaming systems'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'What is Systems Cafe?'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

// 3000 is a common development port. Second parameter is optional
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
const express = require('express'); // import express
const path = require('path'); // import path
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const datas = require('./Datas');

const app = express(); // create const var app for express
const PORT = process.env.PORT || 3001; // create port

// init middleware
// app.use(logger);

// handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: false})); // for parsing aplication/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

// homepage route with handlebars
app.get('/', (req,res) => res.render('index', {
    title: 'Data books',
    datas
}));

// create static website without write many codes - 2
// app.use(express.static(path.join(__dirname, 'public')));

// datas api routes
app.use('/api/datas', require('./routes/api/datas'));

app.listen(PORT, () => console.log(`server started in port ${PORT}`));

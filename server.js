const express = require('express');
const app = express();
const data = require('./data.js');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/picture', (req,res) => {
    res.send(data.data);
});

app.post ('/picture', (req, res) => {
    console.log(req.body);
    res.send('post successful');
});

app.listen(3001);
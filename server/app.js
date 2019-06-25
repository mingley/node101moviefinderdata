//build server
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const cache = {};
//define port
const port = 3000;
//invoke express
const app = express();
app.use(morgan('dev'));

app.get('/', function(req, res){
    if(req.query.hasOwnProperty('i')){
        var movieId = req.query.i;
        var omdb = 'http://www.omdbapi.com/?i=';
        var info = omdb + movieId + '&apikey=8730e0e';
    } if(req.query.hasOwnProperty('t')){
        var movieId = req.query.t;
        var omdb = 'http://www.omdbapi.com/?t=';
        var info = omdb + movieId + '&apikey=8730e0e';
    } if(cache.hasOwnProperty(info)){
        res.send(cache[info]);
        res.status(200);
    } else{
        axios.get(info).then(function(response){
            cache[info] = response.data;
            res.send(cache[info]);

        })};
});

module.exports = app;
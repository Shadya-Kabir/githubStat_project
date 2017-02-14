var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
const axios = require('axios');
const https = require('https');
const fs = require('fs');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(2000, () => {
    console.log('Server started on http://localhost:2000');
    console.log('Press CTRL C to stop server');
})

app.get('/', (req, res) => {
    res.send('HELLO')
})
app.post('/search', (req, res) => {
    let searchquery = req.body.searchquery;
    let language = req.body.language
    // console.log("POSTED")
    // console.log(req.body.searchquery)
    // res.send("POST")
    // request('https://api.github.com/search/repositories?q=tetris+language:javascript&sort=stars&order=desc', function (error, response, body) {
    //     // if (!error && response.statusCode == 200) {
    //     // console.log(response) // Show the HTML for the Google homepage. 
    //     // }
    //     // else{console.log('ERROR: ' + error)}
    //     console.log(response)
    // })

    axios.get('https://api.github.com/search/repositories?q=' + searchquery + 'language:' + language + '&sort=stars&order=desc')
        .then(response => {
            res.send(response.data.items)
            // console.log(response.data.items)
        })
})
app.get('/search', (req, res) => {
    res.send('SEARCH')
})

app.post('/details', (req, res) => {
    let reponame = req.body.reponame;
    let owner = req.body.owner
    axios({
        method: 'get',
        url: ('https://api.github.com/repos/' + owner + '/' + reponame + '/stats/participation'),
        headers: { 'Accept': 'application/vnd.github.v3.star+json', 'Link': 'rel="last"' }
    }).then(response => {
        console.log(response)
        res.send(response.data.all)
    }).catch(err => {
        console.log(err)
    })
})
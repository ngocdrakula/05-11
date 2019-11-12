const express = require('express');
const fs = require('fs');
const MainRouter = express.Router();
const bodyParser = require('body-parser');


MainRouter.get("/", (req, res) => {
    var index = fs.readFileSync("index.html","utf-8");
    var indexjs = fs.readFileSync("index/index.js","utf-8");
    if(typeof (req.session.userInfo) != "undefined"){
        indexjs = indexjs.replace(`username = ""`, `username = "${req.session.userInfo.username}"`);
    }
    res.send(index.replace("indexjs", indexjs));
});
MainRouter.post('/', (req, res) => {
    res.send(`{
        success: false,
        data: null
    }`)
});


module.exports = MainRouter;

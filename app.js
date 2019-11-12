const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'Ki tu can ma hoa',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7*24*60*60*1000
    }
  }))
;
app.use((req, res, next) => {
    console.log(req.sessionID);
    next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));

mongoose.connect('mongodb://localhost/techkids',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("DB connect success!");
        }
    }
);

const mainRouter = require("./routers/main");
app.use("/", mainRouter);

const userRouter = require("./routers/user");
app.use('/api/users', userRouter);

const postRouter = require("./routers/post");
app.use('/api/posts', postRouter);

const authRouter = require("./routers/auth");
app.use('/api/auth', authRouter);

const activeRouter = require("./routers/active");
app.use('/api/active', activeRouter);


app.use(express.static("Bootstrap"));
app.listen(1505, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Server OK!");
    }
})
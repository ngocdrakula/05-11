const express = require('express');
const AuthRouter = express.Router();
const userController = require('../controllers/user');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

AuthRouter.post('/signin', (req, res) => {
    const {username, password} = req.body;
    userController.getOne({username})
    .then(userFound => {
        if(!userFound||!userFound._id){
            res.json({
                success: false,
                err: "User not exist!"
            });
        }
        else{
            if(bcrypt.compareSync(password, userFound.password)){
                req.session.userInfo = {
                    id: userFound._id,
                    user: userFound.name,
                    username: userFound.username
                }
                res.json({
                    success: true,
                    data: {
                        id: userFound._id,
                        user: userFound.name,
                        username: userFound.username
                    }
                })
            }
            else{
                res.json({
                    success: false,
                    err: "Password Wrong!"
                });
            }
        }
    })
    .catch(err => {
        res.json({
            success: false,
            err: err
        });
    })
});

AuthRouter.get("/check", (req, res) => {
    if(req.session && req.session.userInfo){
        const {id} = req.session.userInfo;
        res.json({
            success: true,
            data: req.session.userInfo
        });
        
    }
    else{
        res.json({
            success: false,
            err: "Please Signin"
        });
    }
});


module.exports = AuthRouter;

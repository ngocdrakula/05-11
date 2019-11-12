const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/user");

//Create
userRouter.post("/", (req, res) => {
    const {name, username, password, email} = req.body;
    userController.create({name, username, password, email})
    .then(userCreated => {
        res.json({
            success: true,
            data: userCreated
        });
    })
    .catch(err => {
        var errString = "LOL";
        if(err.keyValue.username){
            errString = "Username already exists!"
        }
        else if(err.keyValue.email){
            errString = "Email already exists!";
        }
        res.json({
            success: false,
            err: errString
        });
    })
});

//Read list
userRouter.get("/", (req, res) => {
    userController.getList()
    .then(listData => {
        res.json({
            success: true,
            data: listData
        });
    })
    .catch(err => {
        res.json({
            success: false,
            error: err
        });
    })
});
//Read by ID
userRouter.get("/:id", (req, res) => {
    const {id} = req.params;
    userController.getById(id)
    .then(getFound => {
        res.json({
            success: true,
            data: getFound
        });
    })
    .catch(err => {
        res.json({
            success: false,
            error: err
        });
    })
});
//Update
userRouter.put("/:id", (req, res) => {
    const {id, } = req.params;
    const {name, password, email} = req.body;
    userController.update(id, {name, password, email})
    .then(userUpdate => {
        res.json({
            success: true,
            data: userUpdate
        });
    })
    .catch(err => {
        res.json({
            success: false,
            error: err
        });
    })
});
//Delete
userRouter.delete("/:id", (req, res) => {
    const {id} = req.params;
    userController.remove(id)
    .then(() => {
        res.json({
            success: true
        });
    })
    .catch(err => {
        res.json({
            success: false,
            error: err
        });
    })
});

module.exports = userRouter;
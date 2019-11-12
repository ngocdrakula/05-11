const express = require("express");
const activeRouter = express.Router();

const activeController = require('../controllers/active');

//Create
activeRouter.post("/", (req, res) => {
    const {name, activename, password, email} = req.body;
    activeController.create({name, activename, password, email})
    .then(activeCreated => {
        res.json({
            success: true,
            data: activeCreated
        });
    })
    .catch(err => {
        res.json({
            success: false,
            error: err
        });
    })
});

//Read list
activeRouter.get("/", (req, res) => {
    activeController.getList()
    .then(getList => {
        res.json({
            success: true,
            data: getList
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
activeRouter.get("/:id", (req, res) => {
    const {id} = req.params;
    activeController.getById(id)
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
activeRouter.put("/:id", (req, res) => {
    const {id, } = req.params;
    const {name, password, email} = req.body;
    activeController.update(id, {active, password, email})
    .then(activeUpdate => {
        res.json({
            success: true,
            data: activeUpdate
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
activeRouter.delete("/:id", (req, res) => {
    const {id} = req.params;
    activeController.remove(id)
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


module.exports = activeRouter;
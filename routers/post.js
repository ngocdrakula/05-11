const express = require("express");
const postRouter = express.Router();

const postController = require('../controllers/post');
const activeController = require('../controllers/active');

//Create
postRouter.post("/", (req, res) => {
    const {title, content, image, author} = req.body;
    activeController.create({})
    .then(activeCreated => {
        postController.create({title, content, image, author, active: activeCreated._id})
        .then(postCreated => {
            res.json({
                success: true,
                data: postCreated
            });
        })
        .catch(err => {
            res.json({
                success: false,
                error: err
            });
        })

    })
    .catch(err => {
        res.json({
            success: false,
            error: err
        });
    })
});

//Read list
postRouter.get("/", (req, res) => {
    postController.getList()
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
    });
});
//Read by ID
postRouter.get("/:id", (req, res) => {
    const {id} = req.params;
    postController.getById(id)
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
postRouter.put("/:id", (req, res) => {
    const {id, } = req.params;
    const {title, content, image} = req.body;
    postController.update(id, {title, content, image})
    .then(postUpdate => {
        res.json({
            success: true,
            data: postUpdate
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
postRouter.delete("/:id", (req, res) => {
    const {id} = req.params;
    postController.remove(id)
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


module.exports = postRouter;
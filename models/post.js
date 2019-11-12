const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const post = new Schema(
    {
        title: String,
        content: String,
        image: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        active: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'active'
        }
    },
    {
        timestamps: true
    }
);
const postData = mongoose.model("post", post);

module.exports = postData;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);
const userData = mongoose.model("user", user);

module.exports = userData;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema(
    {
        content:{
            type: String
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        }
    },
    {
        timestamps: true
    }
)
const active = new Schema(
    {
        comment: [comment],
        view: {
            type: Number,
            default: 0
        },
        like: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);
const activeData = mongoose.model("active", active);

module.exports = activeData;
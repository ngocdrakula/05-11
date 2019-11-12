const postData = require("../models/post");

function create(post){
    return (postData.create(post));
}
function getList(){
    return (postData.find({})
    .populate('author',
        {
            'name': 1,
            'username': 1
    })
    .populate('active'));
}
function getById(postId){
    return (postData.findById(postId));
}
function update(postId, updateData){
    return (postData.findByIdAndUpdate({postId}, updateData));
}
function remove(postId){
    return (postData.findByIdAndRemove(postId));
}
module.exports = {
    create,
    getList,
    getById,
    update,
    remove
}
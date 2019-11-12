const bcrypt = require('bcrypt');
const userData = require("../models/user");

function create(user){
    const plainPassWord = user.password;
    const salt = bcrypt.genSaltSync();
    const hassPassword = bcrypt.hashSync(plainPassWord, salt);
    user.password = hassPassword;
    return (userData.create(user));
}
function getList(){
    return (userData.find({}));
}
function getOne(query){
    return (userData.findOne(query));
}
function getById(userId){
    return (userData.findById(userId));
}
function update(userId, updateData){
    return (userData.findByIdAndUpdate({userId}, updateData));
}
function remove(userId){
    return (userData.findByIdAndRemove(userId));
}
module.exports = {
    create,
    getList,
    getById,
    update,
    remove,
    getOne
}
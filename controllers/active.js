const activeData = require("../models/active");

function create(active){
    return (activeData.create(active));
}
function getList(){
    return (activeData.find({}));
}
function getById(activeId){
    return (activeData.findById(activeId));
}
function update(activeId, updateData){
    return (activeData.findByIdAndUpdate({activeId}, updateData));
}
function remove(activeId){
    return (activeData.findByIdAndRemove(activeId));
}
module.exports = {
    create,
    getList,
    getById,
    update,
    remove
}
const db = require('../database/dbconfig.js');
module.exports = {
    find,
    add,
    remove
}

function find() {
    return db('anime');
};

async function add(anime) {
    return db('anime')
        .insert(anime, 'id')
};

function remove(id) {
    return db('anime')
        .where({id})
        .del();
};
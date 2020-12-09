const db = require('../db');
const tableName = require('../../constants/tableNames');

const field = ['id', 'name', 'location'];

module.exports = {
  find() {
    //  TODO: real query needed
    return db(tableName.audience).select(field);
  },
  get(id) {
    return db(tableName.audience)
      .select(field)
      .where({
        id,
      })
      .first(); // first element for res array
  },
};

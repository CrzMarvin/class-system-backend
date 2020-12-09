const db = require('../db');
const tableName = require('../../constants/tableNames');

const field = ['id', 'name', 'type', 'base_url', 'resource'];

module.exports = {
  find() {
    //  TODO: real query needed
    return db(tableName.icons).select(field);
  },
  get(id) {
    return db(tableName.icons)
      .select(field)
      .where({
        id,
      })
      .first(); // first element for res array
  },
};

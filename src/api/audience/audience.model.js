const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./audience.schema.json');

class Icon extends Model {
  static get tableName() {
    return tableNames.audience;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Icon;

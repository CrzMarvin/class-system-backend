const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./icons.schema.json');

class Icon extends Model {
  static get tableName() {
    return tableNames.icon;
  }

  static get jsonSchema() {
    return schema;
  }

  url() {
    return `${this.base_url}${this.resource}`;
  }
}

module.exports = Icon;

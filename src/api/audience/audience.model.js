const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./audience.schema.json');

class Audience extends Model {
  static get tableName() {
    return tableNames.audience;
  }

  static get jsonSchema() {
    return schema;
  }

  static get modifiers() {
    return {
      getInfo(builder) {
        builder.select('name', 'location');
      },
      getAudienceName(builder) {
        builder.select('name as audience_Name');
      },
    };
  }
}

module.exports = Audience;

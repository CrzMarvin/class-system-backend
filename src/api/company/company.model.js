const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
// const schema = require('./company.schema.json');

class Company extends Model {
  static get tableName() {
    return tableNames.company;
  }

  // static get jsonSchema() {
  //   return schema;
  // }
}

module.exports = Company;

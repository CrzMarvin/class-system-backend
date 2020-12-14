const { Model, raw } = require('objection');
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

  static get modifiers() {
    return {
      getUrl(builder) {
        builder.select('concat(base_url, resource) as icon_url');
      },
      getIcon(builder) {
        builder.select(
          'id',
          'name',
          'type',
          raw('concat(base_url, resource)').as('url'),
        );
      },
    };
  }
}

module.exports = Icon;

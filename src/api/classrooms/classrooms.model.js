const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./classrooms.schema.json');
const Icon = require('../icons/icons.model');

class Classroom extends Model {
  static get tableName() {
    return tableNames.classroom;
  }

  static get jsonSchema() {
    return schema;
  }

  // $afterUpdate() {
  //   this.updated_at = new Date().toISOString();
  // }

  static get relationMappings() {
    return {
      icon_info: {
        relation: Model.BelongsToOneRelation,
        modelClass: Icon,
        join: {
          from: `${tableNames.icon}.id`,
          to: `${tableNames.classroom}.icon_id`,
        },
      },
    };
  }

  static get modifiers() {
    return {
      getInfo(builder) {
        builder.select('id', 'name', 'audience_id');
      },
    };
  }
}

module.exports = Classroom;

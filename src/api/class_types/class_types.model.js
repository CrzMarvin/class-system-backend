const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./class_types.schema.json');
const Audience = require('../audience/audience.model');

class ClassType extends Model {
  static get tableName() {
    return tableNames.class_type;
  }

  static get jsonSchema() {
    return schema;
  }

  // $afterUpdate() {
  //   this.updated_at = new Date().toISOString();
  // }

  static get relationMappings() {
    return {
      audience_info: {
        relation: Model.BelongsToOneRelation,
        modelClass: Audience,
        join: {
          from: `${tableNames.audience}.id`,
          to: `${tableNames.class_type}.audience_id`,
        },
      },
    };
  }
}

module.exports = ClassType;

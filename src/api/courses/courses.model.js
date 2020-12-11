const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./courses.schema.json');
const ClassType = require('../class_types/class_types.model');

class Course extends Model {
  static get tableName() {
    return tableNames.course;
  }

  static get jsonSchema() {
    return schema;
  }

  // $afterUpdate() {
  //   this.updated_at = new Date().toISOString();
  // }

  static get relationMappings() {
    return {
      info: {
        relation: Model.HasManyRelation,
        modelClass: ClassType,
        join: {
          from: `${tableNames.course}.id`,
          to: `${tableNames.class_type}.icon_id`,
        },
      },
    };
  }
}

module.exports = Course;

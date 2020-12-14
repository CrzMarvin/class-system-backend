const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./courses.schema.json');
const ClassType = require('../class_types/class_types.model');
const Teacher = require('../teachers/teachers.model');
const Classroom = require('../classrooms/classrooms.model');

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
      class_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClassType,
        join: {
          from: `${tableNames.class_type}.id`,
          to: `${tableNames.course}.type_id`,
        },
      },
      teacher: {
        relation: Model.BelongsToOneRelation,
        modelClass: Teacher,
        join: {
          from: `${tableNames.teacher}.id`,
          to: `${tableNames.course}.teacher_id`,
        },
      },
      classroom: {
        relation: Model.BelongsToOneRelation,
        modelClass: Classroom,
        join: {
          from: `${tableNames.classroom}.id`,
          to: `${tableNames.course}.classroom_id`,
        },
      },
    };
  }
}

module.exports = Course;

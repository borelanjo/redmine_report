const path = require('path');
const _ = require('lodash');

const BaseModel = require(path.join(__dirname, '..', 'entity/base.model'));


class Member extends BaseModel {

  // Table name is the only required property.
  static get tableName() {
    return 'members';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: {
          type: 'integer'
        },
        user_id: {
          type: 'integer'
        },
        project_id: {
          type: 'integer'
        },
        created_on: {
          type: 'date'
        },
        mail_notification: {
          type: 'boolean'
        }
      }
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'user/user.model'),
        join: {
          from: 'members.user_id',
          to: 'users.id'
        }
      },
      project: {
        relation: BaseModel.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'project/project.model'),
        join: {
          from: 'members.project_id',
          to: 'projects.id'
        }
      }
    };
  }
}

module.exports = Member;

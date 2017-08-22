const Model = require('objection').Model;
const path = require('path');
const _ = require('lodash');


class Member extends Model {

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
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'user/user.model'),
        join: {
          from: 'members.user_id',
          to: 'users.id'
        }
      },
      project: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'project/project.model'),
        join: {
          from: 'members.project_id',
          to: 'projects.id'
        }
      }
    };
  }
}

//converte pra snakeCase ('fooBar' => 'foo_bar')
Member.prototype.$formatDatabaseJson = function(json) {
  json = Model.prototype.$formatDatabaseJson.call(this, json);

  return _.mapKeys(json, function(value, key) {
    return _.snakeCase(key);
  });
};

//converte pra snakeCase ('foo_bar' => 'fooBar')
Member.prototype.$parseDatabaseJson = function(json) {
  json = _.mapKeys(json, function(value, key) {
    return _.camelCase(key);
  });

  return Model.prototype.$parseDatabaseJson.call(this, json);
};

module.exports = Member;

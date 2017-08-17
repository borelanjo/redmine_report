var Model = require('objection').Model;
var path = require('path');
var _ = require('lodash');

/**
 * @extends Model
 * @constructor
 */
function MemberModel() {
  Model.apply(this, arguments);
}

Model.extend(MemberModel);
module.exports = MemberModel;

// Table name is the only required property.
MemberModel.tableName = 'members';

// Optional JSON schema. This is not the database schema! Nothing is generated
// based on this. This is only used for validation. Whenever a model instance
// is created it is checked against this schema. http://json-schema.org/.
MemberModel.jsonSchema = {
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
};

MemberModel.relationMappings = {
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

//converte pra snakeCase ('fooBar' => 'foo_bar')
MemberModel.prototype.$formatDatabaseJson = function(json) {
  json = Model.prototype.$formatDatabaseJson.call(this, json);

  return _.mapKeys(json, function(value, key) {
    return _.snakeCase(key);
  });
};

//converte pra snakeCase ('foo_bar' => 'fooBar')
MemberModel.prototype.$parseDatabaseJson = function(json) {
  json = _.mapKeys(json, function(value, key) {
    return _.camelCase(key);
  });

  return Model.prototype.$parseDatabaseJson.call(this, json);
};

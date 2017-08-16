var Model = require('objection').Model;
var _ = require('lodash');

/**
 * @extends Model
 * @constructor
 */
function UserModel() {
  Model.apply(this, arguments);
}

Model.extend(UserModel);
module.exports = UserModel;

// Table name is the only required property.
UserModel.tableName = 'users';

// Optional JSON schema. This is not the database schema! Nothing is generated
// based on this. This is only used for validation. Whenever a model instance
// is created it is checked against this schema. http://json-schema.org/.
UserModel.jsonSchema = {
  type: 'object',

  properties: {
    id: {
      type: 'integer'
    },
    login: {
      type: 'string'
    },
    hashed_password: {
      type: 'string'
    },
    firstname: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    admin: {
      type: 'boolean'
    },
    status: {
      type: 'integer'
    },
    last_login_on: {
      type: 'date'
    },
    language: {
      type: 'string'
    },
    auth_source_id: {
      type: 'integer'
    },
    created_on: {
      type: 'date'
    },
    updated_on: {
      type: 'date'
    },
    type: {
      type: 'string'
    },
    identity_url: {
      type: 'string'
    },
    mail_notification: {
      type: 'string'
    },
    salt: {
      type: 'string'
    },
    must_change_passwd: {
      type: 'boolean'
    },
    passwd_changed_on: {
      type: 'date'
    }
  }
};

// This object defines the relations to other models.
UserModel.relationMappings = {
  parent: {
    relation: Model.BelongsToOneRelation,
    // The related model. This can be either a Model
    // subclass constructor or an absolute file path
    // to a module that exports one. We use the file
    // path version in this example to prevent require
    // loops.
    modelClass: __dirname + '/user.model',
    join: {
      from: 'users.parent_id',
      to: 'users.id'
    }

  },
  children: {
    relation: Model.HasManyRelation,
    modelClass: __dirname + '/user.model',
    join: {
      from: 'users.id',
      // ManyToMany relation needs the `through` object
      // to describe the join table.
      through: {
        // If you have a model class for the join table
        // you need to specify it like this:
        // modelClass: PersonMovie,
        from: 'users.id',
        to: 'users.parent_id'
      },
      to: 'users.parent_id'
    }
  },
};

//converte pra snakeCase ('fooBar' => 'foo_bar')
UserModel.prototype.$formatDatabaseJson = function(json) {
  json = Model.prototype.$formatDatabaseJson.call(this, json);

  return _.mapKeys(json, function(value, key) {
    return _.snakeCase(key);
  });
};

//converte pra snakeCase ('foo_bar' => 'fooBar')
UserModel.prototype.$parseDatabaseJson = function(json) {
  json = _.mapKeys(json, function(value, key) {
    return _.camelCase(key);
  });

  return Model.prototype.$parseDatabaseJson.call(this, json);
};

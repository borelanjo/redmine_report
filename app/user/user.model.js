'use strict';

const Model = require('objection').Model;
const _ = require('lodash');

/**
 * @extends Model
 * @constructor
 */
class User extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'users';
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
    }
  }

}



//converte pra snakeCase ('fooBar' => 'foo_bar')
User.prototype.$formatDatabaseJson = function(json) {
  json = Model.prototype.$formatDatabaseJson.call(this, json);

  return _.mapKeys(json, function(value, key) {
    return _.snakeCase(key);
  });
};

//converte pra snakeCase ('foo_bar' => 'fooBar')
User.prototype.$parseDatabaseJson = function(json) {
  json = _.mapKeys(json, function(value, key) {
    return _.camelCase(key);
  });

  return Model.prototype.$parseDatabaseJson.call(this, json);
};

module.exports = User;

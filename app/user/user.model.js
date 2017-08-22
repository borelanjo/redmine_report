'use strict';

const _ = require('lodash');
const path = require('path');

const BaseModel = require(path.join(__dirname, '..', 'entity/base.model'));

/**
 * @extends Model
 * @constructor
 */
class User extends BaseModel {

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

module.exports = User;

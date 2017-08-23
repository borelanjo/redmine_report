/**
 * Created by edrickrenan on 18/08/17.
 */

'use strict';

const Model = require('objection').Model;
var _ = require('lodash');

/**
 * @extends Model
 * @constructor
 */
class BaseModel extends Model {

  //converte pra snakeCase ('fooBar' => 'foo_bar')
  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson.call(this, json);

    return _.mapKeys(json, function(value, key) {
      return _.snakeCase(key);
    });
  };

  //converte pra snakeCase ('foo_bar' => 'fooBar')
  $parseDatabaseJson(json) {
    json = _.mapKeys(json, function(value, key) {
      return _.camelCase(key);
    });

    return super.$parseDatabaseJson.call(this, json);
  };
}

module.exports = BaseModel;

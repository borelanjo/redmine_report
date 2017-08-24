/**
 * Created by edrickrenan on 18/08/17.
 */



const Model = require('objection').Model;
const _ = require('lodash');

/**
 * @extends Model
 * @constructor
 */
class BaseModel extends Model {

  // Converte pra snakeCase ('fooBar' => 'foo_bar')
  $formatDatabaseJson(json) {
    const superJson = super.$formatDatabaseJson(json);

    return _.mapKeys(superJson, function(value, key) {
      return _.snakeCase(key);
    });
  }

  // Converte pra snakeCase ('foo_bar' => 'fooBar')
  $parseDatabaseJson(json) {
    const superJson = _.mapKeys(json, function(value, key) {
      return _.camelCase(key);
    });

    return super.$parseDatabaseJson(superJson);
  }
}

module.exports = BaseModel;

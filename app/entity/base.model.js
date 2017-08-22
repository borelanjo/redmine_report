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

}


//converte pra snakeCase ('fooBar' => 'foo_bar')
BaseModel.prototype.$formatDatabaseJson = function(json) {
  json = Model.prototype.$formatDatabaseJson.call(this, json);

  return _.mapKeys(json, function(value, key) {
    return _.snakeCase(key);
  });
};

//converte pra snakeCase ('foo_bar' => 'fooBar')
BaseModel.prototype.$parseDatabaseJson = function(json) {
  json = _.mapKeys(json, function(value, key) {
    return _.camelCase(key);
  });

  return Model.prototype.$parseDatabaseJson.call(this, json);
};

module.exports = BaseModel;

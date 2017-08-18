/**
 * Created by edrickrenan on 18/08/17.
 */
var Model = require('objection').Model;
var _ = require('lodash');

/**
 * @extends Model
 * @constructor
 */
function EntityModel() {
  Model.apply(this, arguments);
}

Model.extend(EntityModel);
module.exports = EntityModel;

// atribui o objeto Model que será utilizado para o mapeamento das sub-classes.
EntityModel.model = Model;

//converte pra snakeCase ('fooBar' => 'foo_bar')
EntityModel.prototype.$formatDatabaseJson = function(json) {
  json = Model.prototype.$formatDatabaseJson.call(this, json);

  return _.mapKeys(json, function(value, key) {
    return _.snakeCase(key);
  });
};

//converte pra snakeCase ('foo_bar' => 'fooBar')
EntityModel.prototype.$parseDatabaseJson = function(json) {
  json = _.mapKeys(json, function(value, key) {
    return _.camelCase(key);
  });

  return Model.prototype.$parseDatabaseJson.call(this, json);
};
const path = require('path');

const BaseModel = require(path.join(__dirname, '..', 'base/base.model'));

/**
 * @extends Model
 * @constructor
 */
class User extends BaseModel {

  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

}

module.exports = User;

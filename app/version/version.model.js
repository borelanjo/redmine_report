const path = require('path');

const BaseModel = require(path.join(__dirname, '..', 'base/base.model'));

/**
 * @extends Model
 * @constructor
 */
class Version extends BaseModel {

  // Table name is the only required property.
  static get tableName() {
    return 'versions';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      project: {
        relation: this.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'project/project.model'),
        join: {
          from: 'versions.project_id',
          to: 'projects.id'
        }
      }
    };
  }

}

module.exports = Version;

const path = require('path');

const BaseModel = require(path.join(__dirname, '..', 'base/base.model'));

class Issue extends BaseModel {

  // Table name is the only required property.
  static get tableName() {
    return 'issues';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      project: {
        relation: this.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'project/project.model'),
        join: {
          from: 'issues.project_id',
          to: 'projects.id'
        }
      },
      assigned: {
        relation: this.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'user/user.model'),
        join: {
          from: 'issues.assigned_to_id',
          to: 'users.id'
        }
      },
      author: {
        relation: this.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'user/user.model'),
        join: {
          from: 'issues.author_id',
          to: 'users.id'
        }
      },
      fixedVersion: {
        relation: this.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'version/version.model'),
        join: {
          from: 'issues.fixed_version_id',
          to: 'versions.id'
        }
      }
    }
  }

}

module.exports = Issue;

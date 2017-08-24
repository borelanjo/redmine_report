const path = require('path');

const BaseModel = require(path.join(__dirname, '..', 'base/base.model'));

class Issue extends BaseModel {

  // Table name is the only required property.
  static get tableName() {
    return 'issues';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // Based on this. This is only used for validation. Whenever a model instance
  // Is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      properties: {
        assigned_to_id: {
          type: 'integer'
        },
        author_id: {
          type: 'integer'
        },
        category_id: {
          type: 'integer'
        },
        created_on: {
          type: 'date'
        },
        description: {
          type: 'string'
        },
        done_ratio: {
          type: 'date'
        },
        due_date: {
          type: 'date'
        },
        estimated_hours: {
          type: 'float'
        },
        fixed_version_id: {
          type: 'integer'
        },
        id: {
          type: 'integer'
        },
        lft: {
          type: 'integer'
        },
        lock_version: {
          type: 'integer'
        },
        parent_id: {
          type: 'integer'
        },
        priority_id: {
          type: 'integer'
        },
        project_id: {
          type: 'integer'
        },
        rgt: {
          type: 'integer'
        },
        root_id: {
          type: 'integer'
        },
        start_date: {
          type: 'date'
        },
        status_id: {
          type: 'integer'
        },
        subject: {
          type: 'string'
        },
        tracker_id: {
          type: 'integer'
        },
        updated_on: {
          type: 'date'
        }
      },
      type: 'object'
    }
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

'use strict';

const path = require('path');
const _ = require('lodash');

const BaseModel = require(path.join(__dirname, '..', 'base/base.model'));

class Issue extends BaseModel {

  // Table name is the only required property.
  static get tableName() {
    return 'issues';
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
        tracker_id: {
          type: 'integer'
        },
        project_id: {
          type: 'integer'
        },
        subject: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        due_date: {
          type: 'date'
        },
        category_id: {
          type: 'integer'
        },
        status_id: {
          type: 'integer'
        },
        assigned_to_id: {
          type: 'integer'
        },
        priority_id: {
          type: 'integer'
        },
        fixed_version_id: {
          type: 'integer'
        },
        author_id: {
          type: 'integer'
        },
        lock_version: {
          type: 'integer'
        },
        created_on: {
          type: 'date'
        },
        updated_on: {
          type: 'date'
        },
        start_date: {
          type: 'date'
        },
        done_ratio: {
          type: 'date'
        },
        estimated_hours: {
          type: 'float'
        },
        parent_id: {
          type: 'integer'
        },
        root_id: {
          type: 'integer'
        },
        lft: {
          type: 'integer'
        },
        rgt: {
          type: 'integer'
        },
      }
    }
  };

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
  };

}

module.exports = Issue;

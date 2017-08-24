const path = require('path');

const BaseModel = require(path.join(__dirname, '..', 'base/base.model'));


class Project extends BaseModel {

  // Table name is the only required property.
  static get tableName() {
    return 'projects';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // Based on this. This is only used for validation. Whenever a model instance
  // Is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        homepage: {
          type: 'string'
        },
        is_public: {
          type: 'boolean'
        },
        parent_id: {
          type: 'integer'
        },
        created_on: {
          type: 'date'
        },
        updated_on: {
          type: 'date'
        },
        identifier: {
          type: 'string'
        },
        status: {
          type: 'integer'
        },
        lft: {
          type: 'integer'
        },
        rgt: {
          type: 'integer'
        },
        inherit_members: {
          type: 'boolean'
        },
        default_version_id: {
          type: 'integer'
        }
      }
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      parent: {
        relation: this.BelongsToOneRelation,
        // The related model. This can be either a Model
        // Subclass constructor or an absolute file path
        // To a module that exports one. We use the file
        // Path version in this example to prevent require
        // Loops.
        modelClass: `${__dirname}/project.model`,
        join: {
          from: 'projects.parent_id',
          to: 'projects.id'
        }

      },
      children: {
        relation: this.HasManyRelation,
        modelClass: `${__dirname}/project.model`,
        join: {
          from: 'projects.id',
          // ManyToMany relation needs the `through` object
          // To describe the join table.
          through: {
            // If you have a model class for the join table
            // You need to specify it like this:
            // ModelClass: PersonMovie,
            from: 'projects.id',
            to: 'projects.parent_id'
          },
          to: 'projects.parent_id'
        }
      },
      members: {
        relation: this.ManyToManyRelation,
        modelClass: path.join(__dirname, '..', 'user/user.model'),
        join: {
          from: 'projects.id',
          // ManyToMany relation needs the `through` object
          // To describe the join table.
          through: {
            // If you have a model class for the join table
            // You need to specify it like this:
            // ModelClass: PersonMovie,
            modelClass: path.join(__dirname, '..', 'member/member.model'),
            from: 'members.project_id',
            to: 'members.user_id'
          },
          to: 'users.id'
        }
      },
      versions: {
        relation: this.HasManyRelation,
        modelClass: path.join(__dirname, '..', 'version/version.model'),
        join: {
          from: 'projects.id',
          to: 'versions.project_id'
        }
      }
    };
  }
}

module.exports = Project;

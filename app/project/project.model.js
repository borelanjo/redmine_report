const path = require('path');

const BaseModel = require(path.join(__dirname, '..', 'base/base.model'));


class Project extends BaseModel {

  // Table name is the only required property.
  static get tableName() {
    return 'projects';
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

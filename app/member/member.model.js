const path = require('path');

const BaseModel = require(path.join(__dirname, '..', 'base/base.model'));


class Member extends BaseModel {

  // Table name is the only required property.
  static get tableName() {
    return 'members';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      user: {
        relation: this.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'user/user.model'),
        join: {
          from: 'members.user_id',
          to: 'users.id'
        }
      },
      project: {
        relation: this.HasOneRelation,
        modelClass: path.join(__dirname, '..', 'project/project.model'),
        join: {
          from: 'members.project_id',
          to: 'projects.id'
        }
      }
    };
  }
}

module.exports = Member;

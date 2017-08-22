'use strict';

const path = require('path');
const _ = require('lodash');

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
        project_id: {
          type: 'integer'
        },
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        effective_date: {
          type: 'date'
        },
        created_on: {
          type: 'date'
        },
        updated_on: {
          type: 'date'
        },
        wiki_page_title: {
          type: 'string'
        },
        status: {
          type: 'string'
        },
        sharing: {
          type: 'string'
        }
      }
    }
  };

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      project: {
        relation: BaseModel.HasOneRelation,
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

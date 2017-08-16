var Model = require('objection').Model;
var _ = require('lodash');

/**
 * @extends Model
 * @constructor
 */
function ProjectModel() {
  Model.apply(this, arguments);
}

Model.extend(ProjectModel);
module.exports = ProjectModel;

// Table name is the only required property.
ProjectModel.tableName = 'projects';

// Optional JSON schema. This is not the database schema! Nothing is generated
// based on this. This is only used for validation. Whenever a model instance
// is created it is checked against this schema. http://json-schema.org/.
ProjectModel.jsonSchema = {
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
    },
  }
};

// This object defines the relations to other models.
ProjectModel.relationMappings = {
  parent: {
    relation: Model.BelongsToOneRelation,
    // The related model. This can be either a Model
    // subclass constructor or an absolute file path
    // to a module that exports one. We use the file
    // path version in this example to prevent require
    // loops.
    modelClass: __dirname + '/project.model',
    join: {
      from: 'projects.parent_id',
      to: 'projects.id'
    }

  },
  children: {
    relation: Model.HasManyRelation,
    modelClass: __dirname + '/project.model',
    join: {
      from: 'projects.id',
      // ManyToMany relation needs the `through` object
      // to describe the join table.
      through: {
        // If you have a model class for the join table
        // you need to specify it like this:
        // modelClass: PersonMovie,
        from: 'projects.id',
        to: 'projects.parent_id'
      },
      to: 'projects.parent_id'
    }
  },
};

//converte pra snakeCase ('fooBar' => 'foo_bar')
ProjectModel.prototype.$formatDatabaseJson = function(json) {
  json = Model.prototype.$formatDatabaseJson.call(this, json);

  return _.mapKeys(json, function(value, key) {
    return _.snakeCase(key);
  });
};

//converte pra snakeCase ('foo_bar' => 'fooBar')
ProjectModel.prototype.$parseDatabaseJson = function(json) {
  json = _.mapKeys(json, function(value, key) {
    return _.camelCase(key);
  });

  return Model.prototype.$parseDatabaseJson.call(this, json);
};

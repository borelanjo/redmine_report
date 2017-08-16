var Model = require('objection').Model;
var _ = require('lodash');

/**
 * @extends Model
 * @constructor
 */
function VersionModel() {
    Model.apply(this, arguments);
}

Model.extend(VersionModel);
module.exports = VersionModel;

// Table name is the only required property.
VersionModel.tableName = 'versions';

// Optional JSON schema. This is not the database schema! Nothing is generated
// based on this. This is only used for validation. Whenever a model instance
// is created it is checked against this schema. http://json-schema.org/.
VersionModel.jsonSchema = {
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

};

VersionModel.relationMappings = {
    project: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + 'project.model',
        join: {
            from: 'versions.project_id',
            to: 'projects.id'
        }
    }
};

//converte pra snakeCase ('fooBar' => 'foo_bar')
VersionModel.prototype.$formatDatabaseJson = function(json) {
    json = Model.prototype.$formatDatabaseJson.call(this, json);

    return _.mapKeys(json, function(value, key) {
        return _.snakeCase(key);
    });
};

//converte pra snakeCase ('foo_bar' => 'fooBar')
VersionModel.prototype.$parseDatabaseJson = function(json) {
    json = _.mapKeys(json, function(value, key) {
        return _.camelCase(key);
    });

    return Model.prototype.$parseDatabaseJson.call(this, json);
};

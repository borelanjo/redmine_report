/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Projeto do redmine.
 * @author borelanjo
 */


var objection = require('objection');
var arrayToTree = require('array-to-tree');

var projectModel = require('./project.model.js');

var ProjectDao = {
  findAll: findAll,
  findById: findById
};

module.exports = ProjectDao;

function findAll(asTree, callback) {

  projectModel
    .query()
    .orderBy('id')
    .then(function(projects) {

      if (asTree) {
        callback(null, arrayToTree(projects, {
          parentProperty: 'parentId',
          customID: 'id'
        }));
      } else {
        callback(null, projects);
      }



    })
    .catch(function(err) {
      callback(err);
    });

}

function findById(id, option, callback) {

  if (id) {
    var queryBuilder = projectModel
      .query()
      .where('id', id)
      .orderBy('id')
      .first()

    for (var variable in option) {
      if (option.hasOwnProperty(variable)) {
        queryBuilder[variable](option[variable])
      }
    }

    queryBuilder
      .then(function(projects) {
        callback(null, projects);
      })
      .catch(function(err) {
        callback(err);
      });
  } else {
    callback(new Error('Id can\'t be null'));
  }


}

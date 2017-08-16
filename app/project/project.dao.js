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

function findById(id, callback) {

  if (id) {
    projectModel
      .query()
      .where('id', id)
      .orderBy('id')
      .first()
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

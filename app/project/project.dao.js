/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Projeto do redmine.
 * @author borelanjo
 */

'use strict';

const objection = require('objection');
const arrayToTree = require('array-to-tree');
const path = require('path');


const BaseDao = require(path.join(__dirname, '..', 'base/base.dao'));

const ProjectModel = require('./project.model.js');

class ProjectDao extends BaseDao {

  constructor() {
    super(ProjectModel);
  }

  findAll(asTree, callback) {
    this.model
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


}
module.exports = ProjectDao;

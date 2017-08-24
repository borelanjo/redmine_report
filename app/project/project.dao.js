/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Projeto do redmine.
 * @author borelanjo
 */
const arrayToTree = require('array-to-tree');
const path = require('path');


const BaseDao = require(path.join(__dirname, '..', 'base/base.dao'));

const ProjectModel = require('./project.model.js');

class ProjectDao extends BaseDao {

  constructor() {
    super(ProjectModel);
  }

  findAll(asTree, callback) {
    this.model.
    query().
    orderBy('id').
    then(function(projects) {

      if (asTree) {
        return callback(null, arrayToTree(projects, {
          parentProperty: 'parentId',
          customID: 'id'
        }));
      }

      return callback(null, projects);

    }).
    catch(function(err) {
      callback(err);
    });
  }


}
module.exports = ProjectDao;

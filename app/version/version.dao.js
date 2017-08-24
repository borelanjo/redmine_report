/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Versão do redmine.
 * @author edrickrenan
 */



const VersionModel = require('./version.model.js');

const path = require('path');
const BaseDao = require(path.join(__dirname, '..', 'base/base.dao'));

class VersionDao extends BaseDao {
  constructor() {
    super(VersionModel);
  }

}
module.exports = VersionDao;

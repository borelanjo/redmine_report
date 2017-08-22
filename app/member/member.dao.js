/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Membros dos projetos do redmine.
 * @author edrickrenan
 */

'use strict';

const path = require('path');
const BaseDao = require(path.join(__dirname, '..', 'base/base.dao'));

var MemberModel = require('./member.model.js');

class MemberDao extends BaseDao {
  constructor() {
    super(MemberModel);
    // this.model = projectModel;
  }
}

module.exports = MemberDao;

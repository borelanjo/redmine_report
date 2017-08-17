/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Membros dos projetos do redmine.
 * @author edrickrenan
 */

var memberModel = require('./member.model.js');

var MemberDao = {
  findAll: findAll,
  findById: findById
};

module.exports = MemberDao;

function findAll(option, callback) {
  var queryBuilder = memberModel
    .query()
    .orderBy('id');

  for (var variable in option) {
    if (option.hasOwnProperty(variable)) {
      queryBuilder[variable](option[variable])
    }
  }
  queryBuilder
    .then(function(members) {
      callback(null, members);
    })
    .catch(function(err) {
      callback(err);
    });
}

function findById(id, option, callback) {

  if (id) {
    var queryBuilder = memberModel
      .query()
      .where('id', id)
      .orderBy('id')
      .first();

    for (var variable in option) {
      if (option.hasOwnProperty(variable)) {
        queryBuilder[variable](option[variable])
      }
    }

    queryBuilder
      .then(function(member) {
        callback(null, member);
      })
      .catch(function(err) {
        callback(err);
      });
  } else {
    callback(new Error('Id can\'t be null'));
  }
}

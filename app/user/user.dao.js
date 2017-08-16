/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Projeto do redmine.
 * @author borelanjo
 */


var objection = require('objection');

var userModel = require('./user.model.js');

var UserDao = {
  findAll: findAll,
  findById: findById,
  isPasswordCorrect: isPasswordCorrect
};

module.exports = UserDao;

function findAll(callback) {

  userModel
    .query()
    .orderBy('id')
    .then(function(users) {
      callback(null, users);
    })
    .catch(function(err) {
      callback(err);
    });

}

function findById(id, callback) {

  if (id) {
    userModel
      .query()
      .where('id', id)
      .first()
      .then(function(users) {
        callback(null, users);
      })
      .catch(function(err) {
        callback(err);
      });
  } else {
    callback(new Error('Id can\'t be null'));
  }


}

function isPasswordCorrect(username, password, callback) {
  callback(new Error('Não implementado ainda!'));
}

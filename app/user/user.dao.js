/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Usuário do redmine.
 * @author borelanjo
 */

var sha1 = require('sha1');

var objection = require('objection');

var userModel = require('./user.model.js');

var UserDao = {
  findAll: findAll,
  findById: findById,
  findByLogin: findByLogin,
  isPasswordCorrect: isPasswordCorrect,
  hashPassword: hashPassword
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

function findByLogin(login, callback) {

  if (login) {
    userModel
      .query()
      .where('login', login)
      .first()
      .then(function(user) {
        callback(null, user);
      })
      .catch(function(err) {
        callback(err);
      });
  } else {
    callback(new Error('Login can\'t be null'));
  }


}

function isPasswordCorrect(login, password, callback) {
  findByLogin(login, function(err, user) {

    if (err) {
      callback(err);
    } else {
      if (user) {
        var isPasswordCorrect = hashPassword(password, user.salt) === user.hashedPassword;
        callback(null, isPasswordCorrect);
      } else {
        callback(null, false);
      }
    }
  });
}

function hashPassword(password, salt) {
  var hash = sha1(salt + sha1(password));
  return hash;

}

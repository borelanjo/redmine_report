/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Usuário do redmine.
 * @author borelanjo
 */

'use strict';

const sha1 = require('sha1');

const objection = require('objection');

const UserModel = require('./user.model.js');

const path = require('path');
const BaseDao = require(path.join(__dirname, '..', 'base/base.dao'));

class UserDao extends BaseDao {
  constructor() {
    super(UserModel);
  }

  findByLogin(login, callback) {

    if (login) {
      this.model
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

  isPasswordCorrect(login, password, callback) {
    //Como é uma função assicrona e uma closure, o this tem outro contexto dentro do findByLogin
    var self = this;
    this.findByLogin(login, function(err, user) {

      if (err) {
        callback(err);
      } else {
        if (user) {
          var isPasswordCorrect = self.hashPassword(password, user.salt) === user.hashedPassword;
          callback(null, isPasswordCorrect);
        } else {
          callback(null, false);
        }
      }
    });
  }

  hashPassword(password, salt) {
    var hash = sha1(salt + sha1(password));
    return hash;

  }

};

module.exports = UserDao;

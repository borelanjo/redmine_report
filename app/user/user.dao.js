/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Usuário do redmine.
 * @author borelanjo
 */

const sha1 = require('sha1');

const UserModel = require('./user.model.js');

const path = require('path');
const BaseDao = require(path.join(__dirname, '..', 'base/base.dao'));

class UserDao extends BaseDao {
  constructor() {
    super(UserModel);
  }

  findByLogin(login, callback) {

    if (!login) {
      return callback(new Error('Login can\'t be null'));
    }

    return this.model.
    query().
    where('login', login).
    first().
    then(function(user) {
      callback(null, user);
    }).
    catch(function(err) {
      callback(err);
    });
  }

  isPasswordCorrect(login, password, callback) {
    // Como é uma função assicrona e uma closure, o this tem outro contexto dentro do findByLogin
    this.findByLogin(login, function(err, user) {

      if (err) {
        return callback(err);
      }
      if (user) {
        const isPasswordCorrect = UserDao.hashPassword(password, user.salt) === user.hashedPassword;

        return callback(null, isPasswordCorrect);
      }

      return callback(null, false);
    });
  }

  static hashPassword(password, salt) {
    return sha1(salt + sha1(password));
  }
}

module.exports = UserDao;

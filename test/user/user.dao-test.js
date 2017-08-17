var objection = require('objection');
var Knex = require('knex');
const uuidV1 = require('uuid/v1');

var knexConfig = require('./../../knexfile');
var Model = require('objection').Model;

var chai = require('chai');

var expect = chai.expect;
var assert = chai.assert;
var sinon = require('sinon');
var userDao = require('./../../app/user/user.dao');

/** Inicializa knex. */
var knex = Knex(knexConfig.development);

/**  Bind all Models to a knex instance. If you only have one database in
your server this is all you have to do. For multi database systems, see
the Model.bindKnex method. */
Model.knex(knex);

describe('userDao', function() {
  describe('findAll', function() {
    it('Deve ser obtido a lista de todos os usuários', function(done) {
      userDao.findAll(function(err, users) {
        if (err) {
          done(err);
        } else {
          expect(users, 'Lista de usuários está indefinida').to.exist;
          expect(users).to.be.a('array');
          expect(users[0].id, 'Id não pode ser nulo').to.not.be.null;
          done();
        }

      });

    });


  });

  describe('findById', function() {
    it('Deve ser obtido o usuário pelo número do seu id', function(done) {
      userDao.findById(1, function(err, user) {
        if (err) {
          done(err);
        } else {
          expect(user, 'Lista de usuários está indefinida').to.exist;
          expect(user).to.be.a('object');
          expect(user.id, 'Id não pode ser nulo').to.not.be.null;
          done();
        }

      });

    });
    it('Caso não seja passado um ID deve ser retornado um erro', function(done) {
      userDao.findById(null, function(err, user) {
        if (err) {
          done();
        }

      });

    });
  });

  describe('findByLogin', function() {
    it('Deve ser obtido os dados do usuário pelo seu login', function(done) {
      var username = 'test';
      userDao.findByLogin(username, function(err, user) {
        if (err) {
          done(err);
        } else {
          expect(user, 'Usuário não resgatado').to.exist;
          expect(user).to.be.a('object');
          expect(user.id, 'Id não pode ser nulo').to.not.be.null;
          expect(user.login).to.be.equal(username);
          done();
        }

      });

    });
    it('Caso não seja passado um ID deve ser retornado um erro', function(done) {
      userDao.findById(null, function(err, user) {
        if (err) {
          done();
        }

      });

    });
  });

  describe('isPasswordCorrect', function() {
    it('Deve retornar true se a senha for correta', function(done) {
      var username = 'test';
      var password = 'test1234';
      userDao.isPasswordCorrect(username, password, function(err, isCorrect) {
        if (err) {
          done(err);
        } else {
          expect(isCorrect, 'A senha não é correta').to.be.equal(true);
          done();
        }

      });
    });
    it('Deve retornar false se a senha for errada', function(done) {
      var username = 'test';
      var password = '1234';
      userDao.isPasswordCorrect(username, password, function(err, isCorrect) {
        if (err) {
          done(err);
        } else {
          expect(isCorrect, 'A senha não é incorreta').to.be.equal(false);
          done();
        }

      });
    });

    it('Deve retornar false se o usuário não existir', function(done) {
      var username = '1234';
      var password = '1234';
      userDao.isPasswordCorrect(username, password, function(err, isCorrect) {
        if (err) {
          done(err);
        } else {
          expect(isCorrect).to.be.equal(false);
          done();
        }

      });
    });

  });

  describe('hashPassword', function() {
    it('Deve gerar um hash em SHA1 baseado em um salt', function() {
      var username = 'test';
      var password = 'test1234';
      var hashed = '1c144e0bc0ed0d0afa7668206fcaa440518c521d';
      var salt = 'eb15da9ca7869dc27f363c2b3993ed72';
      var newHash = userDao.hashPassword(password, salt);
      expect(newHash, 'Lista de usuários está indefinida').to.be.equal('1c144e0bc0ed0d0afa7668206fcaa440518c521d');


    });
  });
});

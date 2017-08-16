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

  describe('isPasswordCorrect', function() {
    it('Deve retornar true se a senha for correta', function(done) {
      var username = 'teste';
      var password = 'teste';
      userDao.isPasswordCorrect(username, password, function(err, result) {
        if (err) {
          done(err);
        } else {
          expect(result, 'Lista de usuários está indefinida').to.be.equal(true);
          done();
        }

      });

    });




  });
});

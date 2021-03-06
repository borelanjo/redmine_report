const Knex = require('knex');

const knexConfig = require('./../../knexfile');
const Model = require('objection').Model;

const chai = require('chai');

const expect = chai.expect;
const VersionDao = require('./../../app/version/version.dao');

/** Inicializa knex. */
const knex = Knex(knexConfig.development);

/**  Bind all Models to a knex instance. If you only have one database in
 your server this is all you have to do. For multi database systems, see
 the Model.bindKnex method. */
Model.knex(knex);

const versionDao = new VersionDao();

describe('versionDao', function() {
  describe('findAll', function() {
    it('Deve ser obtida a lista de versões', function(done) {
      versionDao.findAll(null, function(err, versions) {
        if (err) {
          done(err);
        } else {
          expect(versions, 'Lista de versões está indefinida').to.exist;
          expect(versions).to.be.a('array');
          expect(versions[0].id, 'Id não pode ser nulo').to.not.be.null;
          done();
        }

      });

    });

    it('Se for passado a opção eager(project) deve vim o projeto relacionado', function(done) {
      const option = {
        eager: 'project'
      };
      versionDao.findAll(option, function(err, versions) {
        if (err) {
          done(err);
        } else {
          const firstVersion = versions[0];
          expect(firstVersion.project, 'A Versão precisa ter um projeto relacionado').to.exist;
          expect(firstVersion.project.name).to.be.equal('[Example Project 1]');
          done();
        }

      });

    });


  });
  describe('findById', function() {
    it('Deve ser obtida a versão pelo número do seu id', function(done) {
      versionDao.findById(1, null, function(err, version) {
        if (err) {
          done(err);
        } else {
          expect(version, 'Versão inexistente').to.exist;
          expect(version).to.be.a('object');
          expect(version.id, 'Id não pode ser nulo').to.not.be.null;
          done();
        }
      });
    });
    it('Caso não seja passado um ID deve ser retornado um erro', function(done) {
      versionDao.findById(null, null, function(err) {
        if (err) {
          done();
        }
      });
    });
    it('Se for passado a opção eager(project) deve vim o projeto relacionado', function(done) {
      const option = {
        eager: 'project'
      };
      versionDao.findById(1, option, function(err, version) {
        if (err) {
          done(err);
        } else {
          expect(version.project, 'A Versão precisa ter um projeto relacionado').to.exist;
          expect(version.project.name).to.be.equal('[Example Project 1]');
          done();
        }

      });

    });
  });
});

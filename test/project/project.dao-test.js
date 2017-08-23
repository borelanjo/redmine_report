const objection = require('objection');
const Knex = require('knex');
const uuidV1 = require('uuid/v1');

const ProjectDao = require('./../../app/project/project.dao');
const knexConfig = require('./../../knexfile');
const Model = require('objection').Model;

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');

/** Inicializa knex. */
const knex = Knex(knexConfig.development);

const projectDao = new ProjectDao();



/**  Bind all Models to a knex instance. If you only have one database in
your server this is all you have to do. For multi database systems, see
the Model.bindKnex method. */
Model.knex(knex);


describe('projectDao', function() {
  describe('findAll', function() {
    it('Deve ser obtido a lista de todos os projetos', function(done) {

      projectDao.findAll(true, function(err, projects) {
        if (err) {
          done(err);
        } else {
          expect(projects, 'Lista de projetos está indefinida').to.exist;
          expect(projects).to.be.a('array');
          expect(projects[0].id, 'Id não pode ser nulo').to.not.be.null;
          done();
        }

      });

    });


  });

  describe('findById', function() {
    it('Deve ser obtido o projeto pelo número do seu id', function(done) {
      projectDao.findById(1, null, function(err, project) {
        if (err) {
          done(err);
        } else {
          expect(project, 'Lista de projetos está indefinida').to.exist;
          expect(project).to.be.a('object');
          expect(project.id, 'Id não pode ser nulo').to.not.be.null;
          done();
        }

      });

    });
    it('Caso não seja passado um ID deve ser retornado um erro', function(done) {
      projectDao.findById(null, null, function(err, project) {
        if (err) {
          done();
        }

      });

    });

    it('Se for passado a opção eager() deve vir os objetos relacionados a projeto', function(done) {
      const option = {
          eager: '[members,versions]'
      };
      projectDao.findById(1, option, function(err, project) {
        if (err) {
          done(err);
        } else {
          expect(project.members).to.be.a('array');
          expect(project.versions).to.be.a('array');
          done();
        }
      })
    });


  });
});

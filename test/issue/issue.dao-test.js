const objection = require('objection');
const Knex = require('knex');
const uuidV1 = require('uuid/v1');

const knexConfig = require('./../../knexfile');
const Model = require('objection').Model;

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const IssueDao = require('./../../app/issue/issue.dao');

/** Inicializa knex. */
const knex = Knex(knexConfig.development);

/**  Bind all Models to a knex instance. If you only have one database in
 your server this is all you have to do. For multi database systems, see
 the Model.bindKnex method. */
Model.knex(knex);

const issueDao = new IssueDao();

describe('issueDao', function() {
  describe('findAll', function() {
    it('Deve ser obtida a lista de issues', function(done) {
      issueDao.findAll(null, function(err, issues) {
        if (err) {
          done(err);
        } else {
          expect(issues, 'Lista de issues está indefinida').to.exist;
          expect(issues).to.be.a('array');
          expect(issues[0].id, 'Id não pode ser nulo').to.not.be.null;
          done();
        }

      });

    });

    it('Se for passado a opção eager(project) deve vim o projeto relacionado', function(done) {
      const option = {
        eager: 'project'
      };
      issueDao.findAll(option, function(err, issues) {
        if (err) {
          done(err);
        } else {
          const firstIssue = issues[0];
          expect(firstIssue.project, 'A Issue precisa ter um projeto relacionado').to.exist;
          expect(firstIssue.project.name).to.be.equal('[Example Project 1.1.2]');
          done();
        }

      });

    });


  });
  describe('findById', function() {
    it('Deve ser obtida a versão pelo número do seu id', function(done) {
      issueDao.findById(1, null, function(err, issue) {
        if (err) {
          done(err);
        } else {
          expect(issue, 'Issue inexistente').to.exist;
          expect(issue).to.be.a('object');
          expect(issue.id, 'Id não pode ser nulo').to.not.be.null;
          done();
        }
      });
    });
    it('Caso não seja passado um ID deve ser retornado um erro', function(done) {
      issueDao.findById(null, null, function(err) {
        if (err) {
          done();
        }
      });
    });
    it('Se for passado a opção eager(project) deve vim o projeto relacionado', function(done) {
      const option = {
        eager: 'project'
      };
      issueDao.findById(1, option, function(err, issue) {
        if (err) {
          done(err);
        } else {
          expect(issue.project, 'A Issue precisa ter um projeto relacionado').to.exist;
          expect(issue.project.name).to.be.equal('[Example Project 1.1.2]');
          done();
        }

      });

    });
  });
});

const objection = require('objection');
const Knex = require('knex');
const uuidV1 = require('uuid/v1');

const knexConfig = require('./../../knexfile');
const Model = require('objection').Model;

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const MemberDao = require('./../../app/member/member.dao');

/** Inicializa knex. */
const knex = Knex(knexConfig.development);

/**  Bind all Models to a knex instance. If you only have one database in
 your server this is all you have to do. For multi database systems, see
 the Model.bindKnex method. */
Model.knex(knex);

const memberDao = new MemberDao();

describe('memberDao', function() {
  describe('findAll', function() {
    it('Deve ser obtida a lista de membros de todos os projetos', function(done) {
      memberDao.findAll(null, function(err, members) {
        if (err) {
          done(err);
        } else {
          expect(members, 'Lista de membros está indefinida').to.exist;
          expect(members).to.be.a('array');
          expect(members[0].id, 'Id não pode ser nulo').to.not.be.null;
          done();
        }

      })

    });

    it('Se for passado a opção eager(project) deve vim o projeto relacionado', function(done) {
      const option = {
          eager: 'project'
      };
      memberDao.findAll(option, function(err, members) {
        if (err) {
          done(err);
        } else {
          const firstMember = members[0];
          expect(firstMember.project, 'Um Membro precisa estar associado com um projeto').to.exist;
          expect(firstMember.project.name).to.be.equal('[Example Project 1]');
          done();
        }

      });
    });

    it('Se for passado a opção eager(user) deve vir o usuário relacionado que o membro representa', function(done) {
      const option = {
          eager: 'user'
      };
      memberDao.findAll(option, function(err, members) {
        if (err) {
          done(err);
        } else {
          const firstMember = members[0];
          expect(firstMember.user, 'Um membro precisa estar relacionado com um usuário');
          expect(firstMember.user.firstname).to.be.equal('Jonh Snow');
          expect(firstMember.user.lastname).to.be.equal('King of North');
          done();
        }
      })
    });

    it('Se for passado a opção eager(\'[user,project]\') deve vir o usuário e o projeto relacionado ao membro representado', function(done) {
      const option = {
          eager: '[user,project]'
      };
      memberDao.findAll(option, function(err, members) {
        if (err) {
          done(err);
        } else {
          const firstMember = members[0];
          expect(firstMember.user, 'Um membro precisa estar relacionado com um usuário');
          expect(firstMember.user.firstname).to.be.equal('Jonh Snow');
          expect(firstMember.user.lastname).to.be.equal('King of North');
          expect(firstMember.project, 'Um Membro precisa estar associado com um projeto').to.exist;
          expect(firstMember.project.name).to.be.equal('[Example Project 1]');
          done();
        }
      })
    });

  });

  describe('findById', function() {
    it('Deve ser obtida a versão pelo número do seu id', function(done) {
      memberDao.findById(1, null, function(err, member) {
        if (err) {
          done(err);
        } else {
          expect(member, 'Membro inexistente').to.exist;
          expect(member).to.be.a('object');
          expect(member.id, 'Id não pode ser nulo').to.not.be.null;
          done();
        }
      });
    });

    it('Caso não seja passado um ID deve ser retornado um erro', function(done) {
      memberDao.findById(null, null, function(err) {
        if (err) {
          done();
        }
      });
    });

    it('Se for passado a opção eager(project) deve vim o projeto relacionado', function(done) {
      const option = {
          eager: 'project'
      };
      memberDao.findById(1, option, function(err, member) {
        if (err) {
          done(err);
        } else {
          expect(member.project, 'Um Membro precisa estar associado com um projeto').to.exist;
          expect(member.project.name).to.be.equal('[Example Project 1]');
          done();
        }

      });

    });

    it('Se for passado a opção eager(user) deve vir o usuário relacionado que o membro representa', function(done) {
      const option = {
          eager: 'user'
      };
      memberDao.findById(1, option, function(err, member) {
        if (err) {
          done(err);
        } else {
          expect(member.user, 'O membro precisa estar relacionado com um usuário');
          expect(member.user.firstname).to.be.equal('Jonh Snow');
          expect(member.user.lastname).to.be.equal('King of North');
          done();
        }
      })
    });

    it('Se for passado a opção eager(\'[user,project]\') deve vir o usuário e o projeto relacionado ao membro representado', function(done) {
      const option = {
          eager: '[user,project]'
      };
      memberDao.findById(1, option, function(err, member) {
        if (err) {
          done(err);
        } else {
          expect(member.user, 'O membro precisa estar relacionado com um usuário');
          expect(member.user.firstname).to.be.equal('Jonh Snow');
          expect(member.user.lastname).to.be.equal('King of North');
          expect(member.project, 'Um Membro precisa estar associado com um projeto').to.exist;
          expect(member.project.name).to.be.equal('[Example Project 1]');
          done();
        }
      })
    });
  });
});

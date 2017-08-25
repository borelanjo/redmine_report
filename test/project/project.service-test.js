// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Const ProjectDao = require('./../../app/project/project.dao');

// Require the dev-dependencies
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const server = require('../../server');


chai.use(chaiHttp);
// Our parent block
describe('projectService', () => {
  // BeforeEach((done) => { // Before each test we empty the database
  //   Project.remove({}, (err) => {
  //     Done();
  //   });
  // });

  /*
   * Test the /GET route
   */
  describe('/GET project', () => {
    it('Deve ser pego a lista de todos os projetos', (done) => {
      chai.request(server).
      get('/project').
      end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.lengthOf(6);
        done();
      });
    });
  });

});

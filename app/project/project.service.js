const ProjectDao = require('./project.dao');

const projectDao = new ProjectDao();



/*
 * GET /project route to retrieve all the projects.
 */
const getProjects = function(req, res) {
  // Query the DB and if no errors, send all the projects
  projectDao.findAll(null, function(err, projects) {
    if (err) {
      return res.send(err);
    }

    // If no errors, send them back to the client
    return res.json(projects);
  })

}

// Export all the functions
module.exports = {
  getProjects
};

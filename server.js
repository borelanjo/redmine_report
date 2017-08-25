const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8080;

const Knex = require('knex');

const knexConfig = require('./knexfile');
const Model = require('objection').Model;
const projectService = require('./app/project/project.service');

/** Inicializa knex. */
let knex = null;

// Don't show the log when it is test
if (process.env.NODE_ENV === 'test') {
  knex = Knex(knexConfig.development);

} else {
  // Use morgan to log at command line
  // 'combined' outputs the Apache style LOGs
  knex = Knex(knexConfig.production);
  app.use(morgan('combined'));

}

/**  Bind all Models to a knex instance. If you only have one database in
your server this is all you have to do. For multi database systems, see
the Model.bindKnex method. */
Model.knex(knex);

// Parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application/json'
}));

app.get('/', (req, res) => res.json({
  message: 'Redmine Report!'
}));

app.route('/project').
get(projectService.getProjects);

app.listen(port);
console.log(`Listening on port ${port}`);

// For testing
module.exports = app;

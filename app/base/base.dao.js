/**
 * @file GenericDao
 * @author borelanjo
 */

'use strict';

const objection = require('objection');


class BaseDao {

  constructor(model) {
    this.model = model;
  }

  findAll(option, callback) {
    var queryBuilder = this.model
      .query()
      .orderBy('id');

    for (var variable in option) {
      if (option.hasOwnProperty(variable)) {
        queryBuilder[variable](option[variable])
      }
    }
    queryBuilder
      .then(function(versions) {
        callback(null, versions);
      })
      .catch(function(err) {
        callback(err);
      });
  }

  findById(id, option, callback) {

    if (id) {
      var queryBuilder = this.model
        .query()
        .where('id', id)
        .orderBy('id')
        .first()

      for (var variable in option) {
        if (option.hasOwnProperty(variable)) {
          queryBuilder[variable](option[variable])
        }
      }

      queryBuilder
        .then(function(projects) {
          callback(null, projects);
        })
        .catch(function(err) {
          callback(err);
        });
    } else {
      callback(new Error('Id can\'t be null'));
    }


  }

};

module.exports = BaseDao;

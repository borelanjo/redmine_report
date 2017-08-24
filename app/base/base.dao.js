/**
 * @file GenericDao
 * @author borelanjo
 */

class BaseDao {

  constructor(model) {
    this.model = model;
  }

  findAll(option, callback) {
    const queryBuilder = this.model.
    query().
    orderBy('id');

    for (const variable in option) {
      if (Reflect.has(option, variable)) {
        queryBuilder[variable](option[variable])
      }
    }
    queryBuilder.
    then(function(versions) {
      callback(null, versions);
    }).
    catch(function(err) {
      callback(err);
    });
  }

  findById(id, option, callback) {

    if (!id) {
      return callback(new Error('Id can\'t be null'));
    }

    const queryBuilder = this.model.
    query().
    where('id', id).
    orderBy('id').
    first();

    for (const variable in option) {
      if (Reflect.has(option, variable)) {
        queryBuilder[variable](option[variable])
      }
    }

    return queryBuilder.
    then(function(projects) {
      return callback(null, projects);
    }).
    catch(function(err) {
      return callback(err);
    });
  }

}

module.exports = BaseDao;

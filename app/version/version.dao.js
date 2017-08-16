/**
 * @file Representa o DAO (Objeto de acesso a dados) para a tabela de Projeto do redmine.
 * @author edrickrenan
 */

var objection = require('objection');
var versionModel = require('./version.model.js');

var VersionDao = {
    findAll: findAll,
    findById: findById
};

module.exports = VersionDao;

function findAll(callback) {
    versionModel
        .query()
        .orderBy('id')
        .then(function(versions) {
            callback(null, versions);
        })
        .catch(function(err) {
            callback(err);
        });
}

function findById(id, callback) {

    if (id) {
        versionModel
            .query()
            .where('id', id)
            .orderBy('id')
            .first()
            .then(function (projects) {
                callback(null, projects);
            })
            .catch(function (err) {
                callback(err);
            });
    } else {
        callback(new Error('Id can\'t be null'));
    }
}
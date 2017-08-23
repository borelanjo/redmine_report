'use strict';

const objection = require('objection');
const arrayToTree = require('array-to-tree');
const path = require('path');

const BaseDao = require(path.join(__dirname, '..', 'base/base.dao'));

const IssueModel = require('./issue.model.js');

class IssueDao extends BaseDao {
  constructor() {
    super(IssueModel);
  }
}

module.exports = IssueDao;
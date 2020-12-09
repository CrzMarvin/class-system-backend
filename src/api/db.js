const knex = require('knex');
const { Model } = require('objection');

const knexConfig = require('../../knexfile');

const env = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[env];

const connection = knex(connectionConfig);

Model.knex(connection);

module.exports = connection;

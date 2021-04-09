const database = require('./PollRepositoryMongo');

database.connect();

module.exports = database;
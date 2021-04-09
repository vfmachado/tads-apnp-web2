
const Poll = require('../entities/poll/Poll');
const database = require('../infrastructure/repositories');

module.exports = (pollData) => {

   
    const poll = Poll.create(pollData);

    //PERSIST IN DATABASE
    database.createPoll(poll);

    return poll.id;
    
}

const Poll = require('../entities/poll/Poll');
const database = require('../infrastructure/repositories');

module.exports = async (id) => {

    const pollData = await database.getPollByID(id);
    console.log("POLL DATA RETRIEVED", pollData);

    if (!pollData)
        return "Invalid POLL ID";
    
    const poll = new Poll(pollData);

    delete poll.cpfs;

    if (!poll.blind) {
        return poll;
    }

    let currentDate = new Date();
    if (poll.finalDate > currentDate) {
        return "Poll still running until " + poll.finalDate;
    }

    return poll;
    
}
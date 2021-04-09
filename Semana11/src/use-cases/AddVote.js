const Vote = require('../entities/vote/Vote');
const Poll = require('../entities/poll/Poll');
const database = require('../infrastructure/repositories');

module.exports = async (id, voteDate) => {

    const vote = Vote.create(voteDate);

    const pollData = await database.getPollByID(id);
    
    if (!pollData)
        return {success: false, msg: "Invalid POLL ID"};
    
    const poll = new Poll(pollData);

    try {
        poll.addVote(vote);
    } catch (error) {
        return {success: false, msg: error.message};;
    }

    await database.update(poll);

    return {success: true, msg: "OK"};
}
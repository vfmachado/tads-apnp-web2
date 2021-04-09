
polls = [];

const connect = async () => {
    console.log("FAKE CONNECTION WITH IN MEMORY DATABSE");
}

const createPoll = poll => {
    console.log("POLL CREATED WITH DATABASE IN MEMORY!");
    polls.push(poll);
}

const update = poll => {
    for (let i = 0; i < polls.length; i++) {
        if (polls[i].id == poll.id) {
            polls[i] = poll;
            break;
        }
    }
}

const getPollByID = id => {
    for (let i = 0; i < polls.length; i++) {
        if (polls[i].id == id)
            return polls[i];
    }

    return null;
}

module.exports = { createPoll, getPollByID, update, connect };

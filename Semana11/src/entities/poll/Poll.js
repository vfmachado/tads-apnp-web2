const crypto = require('crypto');

class Poll {

    constructor(pollData) {
        
        this.id = pollData.id;
        
        this.name = pollData.name;
        this.description = pollData.description;

        this.initialDate = pollData.initialDate;
        this.finalDate = pollData.finalDate;

        this.blind = pollData.blind;

        this.options = pollData.options;
        this.cpfs = pollData.cpfs;

    }


    addVote(vote) {

        console.log(vote)

        let currentDate = new Date();
        if (currentDate > this.finalDate)
            throw new Error('Poll has ended! You can check the result');

        if (this.cpfs.includes(vote.cpf))
            throw new Error('You already voted on this Poll');

        if (this.options[vote.option] == undefined)
            throw new Error('Invalid vote option');

        this.options[vote.option].quantity++;
        this.cpfs.push(vote.cpf);
    }


    static create(pollData) {

        let id = crypto.randomBytes(3).toString('hex');
        let initialDate = new Date();
        let finalDate = new Date(pollData.finalDate);
        let cpfs = [];

        if (pollData.options == undefined || Object.keys(pollData.options).length == 0) {
            throw new Error("No Poll options were provided");
        }

        Object.keys(pollData.options).forEach(key => {
            pollData.options[key].quantity = 0;
        })
        //pollData.options.forEach(opt => opt.quantity = 0);

        return new Poll({...pollData, id, initialDate, finalDate, cpfs})
    }
}

module.exports = Poll;
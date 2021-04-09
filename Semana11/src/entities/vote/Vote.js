
class Vote {

    constructor(voteData) {
        this.cpf = voteData.cpf;
        this.option = voteData.option;
    }


    static create(voteData) {
        return new Vote(voteData);
    }
}

module.exports = Vote;
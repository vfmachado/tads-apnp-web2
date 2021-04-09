const CheckPoll = require("../../use-cases/CheckPoll");
const CreatePoll = require("../../use-cases/CreatePoll");


const create = (req, res) => {
    console.log(req.body);
    //INPUT
    const pollData = req.body;

    //TREATMENT
    try {
        const pollID = CreatePoll(pollData);
        res.json({id: pollID});    
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
};

const getPoll = async (req, res) => {

    //INPUT
    const id = req.params.id;
    console.log(id);

    //TREATMENT
    const poll = await CheckPoll(id);

    //RESPONSE
    res.json(poll);
}

module.exports = {create, getPoll}
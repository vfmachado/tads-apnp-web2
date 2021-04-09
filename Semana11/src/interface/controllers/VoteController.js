const AddVote = require('../../use-cases/AddVote');

const addVote = async (req, res) => {
    
    //INPUT
    const id = req.params.pollid;
    const voteData = req.body;

    //TREATMENT
    const result = await AddVote(id, voteData);

    if (!result.success) {
        return res.status(400).json({error: result.msg});
    }

    return res.json({msg: result.msg});
    
};


module.exports = { addVote }
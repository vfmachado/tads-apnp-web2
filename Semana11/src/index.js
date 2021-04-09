const CreatePoll = require('./use-cases/CreatePoll');
const AddVote = require('./use-cases/AddVote');
const CheckPoll = require('./use-cases/CheckPoll');

let date = new Date(2021, 4, 6, 15, 10);
console.log(date);

let pollID = CreatePoll({
    name: "Enquete 1",
    description: "Descricao de uma enquete",
    
    finalDate: date,
    blind: false,

    options: {
        'optA': {description: "Opcao A"},
        'optB': { description: "Opcao B"}
    }

});

console.log(CheckPoll(pollID));

console.log(AddVote(pollID, {cpf: '123', option: 'optB'}));

console.log(CheckPoll(pollID));
/*
console.log(AddVote(pollID, {cpf: '124', option: 'optB'}));

console.log(AddVote(pollID, {cpf: '121', option: 'optC'}));

console.log(database.getPollByID(pollID));
*/


/*
let poll = Poll.create({
    name: "Enquete 1",
    description: "Descricao de uma enquete",
    
    finalDate: new Date(),
    blind: false,

    options: [
        {name: 'optA', quantity: 0, description: "Opcao A"},
        {name: 'optB', quantity: 0, description: "Opcao B"}
    ]

});

console.log(poll);

let poll2 = new Poll(poll);

console.log(poll2)
*/

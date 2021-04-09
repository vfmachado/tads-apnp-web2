const MongoClient = require('mongodb').MongoClient;

let client;

const connect = async () => {
    
    const uri = "mongodb+srv://voting-api-user:1234qwer@cluster0.zhaej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    client.connect(async err => {
        //const collection = await client.db("voting-api").collection("poll").find().toArray();
        //console.log(collection);
    });

}

const getCollection = () => {
    return client.db("voting-api").collection("poll");
}

const createPoll = poll => {
    getCollection().insertOne(poll);   
}

const getPollByID = async id => {
    console.log("DB MONGO - ", id)
    const poll = await getCollection().findOne({id: id});
    console.log(poll)

    if (poll)
        return poll;

    return null;
}

const update = async poll => {
    await getCollection().findOneAndUpdate({id:poll.id}, {$set: {options: poll.options, cpfs: poll.cpfs}});
}

module.exports = { createPoll, getPollByID, update, connect };

const { MongoClient } = require('mongodb');

let client;

exports.connect = async (username, password, clusterURL, database) => {
    if (client === undefined) {
        const uri = `mongodb+srv://${username}:${password}@${clusterURL}/${database}?retryWrites=true&w=majority`;
        client = new MongoClient(uri, { monitorCommands: true });
        try {
            await client.connect();
            return client;
        } catch (e) {
            console.error(e);
        }
    }
    else {
        try {
            client.close();
            await client.connect();
            return client;
        } catch (e) {
            console.error(e);
        }
    }
}
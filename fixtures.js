const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Task = require('./models/Task');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user1, user2] = await User.create(
        {username : "John4", password : "$2b$10$MSJeGperni7DdxnW8YTh9.q5Gguerk/n/ZgxoxGcr/AExEfUjCLOm", "__v" : 0, token : "zq40zsgqz9kShAnW3FewJ" },
    {username : "John5", password : "$2b$10$BMOShuy43WAiHORwzytCrehPLYieEzMkaz0LmOKuq1beOmarhHGOi", token : "yHlLc0Ni_hK1yMorAJ9IW", "__v" : 0 }

);

    await Task.create(
        {
            user: user1._id,
            title: 'Buy a bicycle',
            description: 'mountain bike',
            status: 'new'
        },
        {
            user: user2._id,
            title: 'Get a job',
            description: 'find job with a good salary',
            status: 'new'
        }
    );

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});
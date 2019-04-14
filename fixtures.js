const mongoose = require('mongoose');
const config = require('./config');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [cpus, hdds] = await Category.create(
        {title: 'CPUs', description: 'Central Processing Unit'},
        {title: 'HDDs', description: 'Hard Disk Drives'}
    );

    await Product.create(
        {
            title: 'Intel Core i7',
            price: 500,
            description: 'Very coolCPU',
            category: cpus.title,
            image: 'cpu.jpg'
        },
        {
            title: 'Toshiba 500 GB',
            price: 60,
            description: 'A simple HDD',
            category: hdds._id,
            image: 'hdd.jpg'
        }
    );

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});
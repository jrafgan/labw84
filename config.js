const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    dbUrl: 'mongodb://localhost/labw84',
    mongoOptions: {
        useNewUrlParser: true,
        useCreateIndex: true
    }
};
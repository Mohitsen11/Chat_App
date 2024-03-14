const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect(process.env.DB_STRING);
}

module.exports = connect;
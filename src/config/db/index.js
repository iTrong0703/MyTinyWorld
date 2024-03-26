const mongoose = require('mongoose');
require('dotenv/config');


async function connect(app) {
    try {
        mongoose.connect(process.env.DB_URI)
            .then((result) => app.listen(process.env.PORT, () => {
                console.log(`Example app listening on port ${process.env.PORT}`)
            }))
            .catch((err) => console.log(err));
        console.log('Connect DB Successfully !');

    } catch (error) {
        console.log('Connect DB Failure !');

    }
}

module.exports = { connect }


const homeRouter = require('./home');
const authenRouter = require('./authen');

function route(app) {


    app.use('/', homeRouter, authenRouter);

}

module.exports = route;

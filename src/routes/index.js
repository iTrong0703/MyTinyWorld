
const homeRouter = require('./home');
const authenRouter = require('./authen');

function route(app) {


    app.use('/', homeRouter);
    app.use('/login', authenRouter);


}

module.exports = route;

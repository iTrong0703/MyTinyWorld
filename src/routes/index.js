
const authRouter = require('./authRouter');
const homeRouter = require('./homeRouter');
const roomRouter = require('./roomRouter');
const buildingRouter = require('./buildingRouter');
const tenantRouter = require('./tenantRouter');
const invoiceRouter = require('./invoiceRouter');
const { checkUser } = require('../middlewares/authMiddleware');

function route(app) {
    // routes
    app.get('*', checkUser);
    app.use('/', homeRouter);
    app.use('/rooms', roomRouter);
    app.use('/buildings', buildingRouter);

    app.use('/tenants', tenantRouter);
    app.use('/invoice', invoiceRouter);
    app.use(authRouter);

}

module.exports = route;

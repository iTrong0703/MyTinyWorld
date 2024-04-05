
const authRouter = require('./authRouter');
const homeRouter = require('./homeRouter');
const { checkUser } = require('../middlewares/authMiddleware');

function route(app) {
    // routes
    app.get('*', checkUser);
    app.use('/', homeRouter);
    app.get('/rooms', (req, res) => res.render('rooms'));
    app.use(authRouter);

}

module.exports = route;

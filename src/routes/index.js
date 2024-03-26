
const authRoutes = require('./authRoutes');
const { requireAuth, checkUser } = require('../middlewares/authMiddleware');

function route(app) {
    // routes
    app.get('*', checkUser);
    app.get('/', requireAuth, (req, res) => res.render('home'));
    // app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
    app.use(authRoutes);

}

module.exports = route;

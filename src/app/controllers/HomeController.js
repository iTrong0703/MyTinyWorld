class HomeController {

    // GET /
    index(req, res) {
        res.render('home', { layout: 'main.hbs' });
    }
}

module.exports = new HomeController; //exports ra một đối tượng NewsController để các file khác có thể requires('./NewsController.js) vào

class TenantController {
    // GET /news
    index(req, res) {
        res.render('tenants');
    }

}

module.exports = new TenantController; 

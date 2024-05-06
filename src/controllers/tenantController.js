class TenantController {
    // GET /news
    index(req, res) {
        res.render('tenants');
    }

    getAddTenants(req, res) {
        res.render('add_tenants');
    }

}

module.exports = new TenantController; 

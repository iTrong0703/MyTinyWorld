class StaffController {
    // GET /news
    index(req, res) {
        res.render('staff');
    }

    getAddStaff(req, res) {
        res.render('add_staff');
    }
    
}

module.exports = new StaffController; 

class ComplaintController {
    // GET /news
    index(req, res) {
        res.render('complaints');
    }

    getAddComplaint(req, res) {
        res.render('add_complaint');
    }
    
}

module.exports = new ComplaintController; 

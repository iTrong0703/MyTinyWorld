class ComplaintController {
    // GET /news
    index(req, res) {
        res.render('complaints');
    }


}

module.exports = new ComplaintController; 

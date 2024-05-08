class RoomController {
    // GET /news
    index(req, res) {
        res.render('rooms_table');
    }

}

module.exports = new RoomController; 

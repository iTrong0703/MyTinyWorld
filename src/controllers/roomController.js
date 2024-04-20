class RoomController {
    // GET /news
    index(req, res) {
        res.render('rooms');
    }

}

module.exports = new RoomController; 

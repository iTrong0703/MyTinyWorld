class BuildingController {
    // GET /news
    index(req, res) {
        res.render('building');
    }

    getAddBuilding(req, res) {
        res.render('add_building');
    }

}

module.exports = new BuildingController; 

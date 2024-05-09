class BuildingController {
  // GET /news
  index(req, res) {
    res.render('building');
  }

  getAddBuilding(req, res) {
    res.render('add_building');
  }

  async getBuilding(req, res) {
    const response = await fetch('http://localhost:8080/buildings/getall', {
      ownername: 'kha',
    });
    const building = await response.json();
    console.log(building);
    // console.log(response);
    res.render('building-list', {
      ownername: building.ownername,
    });
  }
}

module.exports = new BuildingController();

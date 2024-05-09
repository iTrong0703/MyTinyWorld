const axios = require('axios');
class BuildingController {
  // GET /news
  index(req, res) {
    var param = {
      url: 'http://localhost:8080/buildings/getall',
      method: 'GET',
      responseType: 'application/json',
    };
    var promise = axios(param);
    promise.then(function (result) {
      // var buildings = result.data.data;
      // console.log(buildings);
      res.render('building', result);
    });
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

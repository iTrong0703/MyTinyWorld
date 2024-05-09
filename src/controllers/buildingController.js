const axios = require('axios');
class BuildingController {
  // GET /news
  // async index(req, res) {
  //   var param = {
  //     url: 'http://localhost:8080/buildings/getall',
  //     method: 'GET',
  //     responseType: 'application/json',
  //   };
  //   var promise = axios(param);
  //   promise.then(function (result) {
  //     const buildings = result.data;
  //     // console.log(buildings);
  //     console.log(buildings);
  //     res.render('building', { buildings: buildings });
  //   });
  // }

  index(req, res) {
    fetch(`http://localhost:8080/buildings/getall`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const buildings = json.data.result;
        console.log(buildings);
        res.render('building', { buildings });
      })
      .catch((err) => res.status(500).send(err.message));
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

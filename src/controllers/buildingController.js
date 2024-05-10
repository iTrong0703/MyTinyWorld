const axios = require('axios');
class BuildingController {

  index(req, res) {
    const managerName = req.cookies.managerName;
    console.log(managerName);
    const url = new URL('http://localhost:8080/buildings/getall');
    const add_params = { managername: managerName, };
    const new_params = new URLSearchParams([
      ...Array.from(url.searchParams.entries()), ... Object.entries(add_params),
    ]).toString();
    const urlParam = new URL(`${url.origin}${url.pathname}?${new_params}`);

    fetch(urlParam, {
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

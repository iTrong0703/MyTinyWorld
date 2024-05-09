const buildings = document.getElementById('dropdown-building');

var param = {
  url: 'http://localhost:8080/buildings/getall',
  method: 'GET',
  responseType: 'application/json',
};
var promise = axios(param);
promise.then(function (result) {
  renderBuildings(result.data.data.result);
});

fetch('http://localhost:8080/buildings/getall')
  .then((res) => res.json())
  .then((data) => console.log(data.data));

function renderBuildings(data) {
  //   console.log(data);
  for (const x of data) {
    buildings.options[buildings.options.length] = new Option(
      x.buildingname,
      x.buildingname
    );
  }
}

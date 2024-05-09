var citis = document.getElementById('dropdown-city');
var district = document.getElementById('dropdown-district');
var ward = document.getElementById('dropdown-ward');
const buildings = document.getElementById('dropdown-building');

var Parameter = {
  url: 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
  method: 'GET',
  responseType: 'application/json',
};
var promise = axios(Parameter);
promise.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  for (const x of data) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  citis.onchange = function () {
    district.length = 1;
    ward.length = 1;
    if (this.value != '') {
      const result = data.filter((n) => n.Id === this.value);
      for (var k of result[0].Districts) {
        district.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  };

  district.onchange = function () {
    ward.length = 1;
    const dataCity = data.filter((n) => n.Id === citis.value);
    if (this.value != '') {
      const dataWards = dataCity[0].Districts.filter(
        (n) => n.Id === this.value
      )[0].Wards;
      for (var w of dataWards) {
        ward.options[ward.options.length] = new Option(w.Name, w.Id);
      }
    }
  };
}
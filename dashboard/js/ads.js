let base_url = 'https://dev.minematrimony.app'
let version = 'v1'

// Form Validation
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function ads() {
  let main_data
  await fetch(base_url + '/user/' + version + '/ad/get', {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "authorization": "Bearer " + getCookie('access-token')
    },
    mode: 'cors'
  })
    .then(response => {
      var data = response.json()
      return data
    }
    )
    .then(data => {
      if (data.response_code == 200) {
        main_data = data.response
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      }
    })
    .catch(err => { console.log(err); });

  return main_data
}

$(document).ready(async function () {
  let load_spinner = document.getElementById("load_spinner")
  let data = await ads()
  let arr = []
  data.forEach(element => {
    let test_arr = []
    test_arr.push((element.name) ? (element.name.charAt(0).toUpperCase() + element.name.slice(1)) : '-')
    test_arr.push((element.owner_name) ? (element.owner_name.charAt(0).toUpperCase() + element.owner_name.slice(1)) : '-')
    test_arr.push('<a target="_blank" href="tel:'+element.owner_number+'">'+element.owner_number+'</a>')
    test_arr.push(element.country.label)
    test_arr.push(element.state.label)
    test_arr.push(element.city.label)
    test_arr.push(element.geojson.coordinates)
    test_arr.push('<a href="ad-update.html?id=' + element._id + '" class="btn btn-dark btn-block">Update <i class="fas fa-edit"></i></a>')
    arr.push(test_arr)
  });
  load_spinner.remove()
  $('#dataTable').DataTable({
    data: arr,
    columns: [
      { title: 'Name' },
      { title: 'Owner Name' },
      { title: 'Owner Number' },
      { title: 'Country' },
      { title: 'State' },
      { title: 'City' },
      { title: 'Coordinates' },
      { title: 'Action' }
    ],
    columnDefs: [{
      "defaultContent": "-",
      "targets": "_all"
    }]
  });
});
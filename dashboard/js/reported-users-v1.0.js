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

async function users() {
  let main_data
  await fetch(base_url + '/user/' + version + '/profile/all/reported/get', {
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
        main_data = data.response.data
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      }
    })
    .catch(err => { console.log(err); });

  return main_data
}

$(document).ready(async function () {
  let load_spinner = document.getElementById("load_spinner")
  let data = await users()
  let arr = []
  data.forEach(element => {
    let test_arr = []
    test_arr.push((element.user_details.name) ? (element.user_details.name.charAt(0).toUpperCase() + element.user_details.name.slice(1)) : '-')
    test_arr.push(element.user_details.phone)
    test_arr.push(element.count)
    test_arr.push((element.user_details.is_blocked) ? '<span class="red">Blocked</span>' : '<span class="green">Not Blocked</span>')
    test_arr[4] = '<a href="view-user.html?id=' + element.user_details._id + '" class="btn btn-dark btn-block">View <i class="fas fa-eye"></i></a>'
    arr.push(test_arr)
  });
  load_spinner.remove()
  $('#dataTable').DataTable({
    data: arr,
    columns: [
      { title: 'Name' },
      { title: 'Mobile' },
      { title: 'Number of Reports' },
      { title: 'Status' },
      { title: 'Action' }
    ],
    columnDefs: [{
      "defaultContent": "-",
      "targets": "_all"
    }]
  });
});
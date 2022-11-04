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
  await fetch(base_url + '/user/' + version + '/profile/all/get', {
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
    test_arr.push((element.name) ? (element.name.charAt(0).toUpperCase() + element.name.slice(1)) : '-')
    for (const [key, value] of Object.entries(element)) {
      if (key == 'gender' || key == 'city') {
        test_arr.push(value.label)
      } else {
        if (key == 'profile_verified') {
          test_arr.push((value) ? '<span class="green">Verified</span>' : '<span class="red">Not Verified</span>')
        } else if (key == 'profile_completion') {
          let val = ''
          switch (value) {
            case 0: val = '<span class="red">0%</span>'; break;
            case 1: val = '<span class="orange">25%</span>'; break;
            case 2: val = '<span class="orange">50%</span>'; break;
            case 3: val = '<span class="orange">75%</span>'; break;
            case 4: val = '<span class="green">100%</span>'; break;
          }
          test_arr.push(val)
        }
        else {
          if (key == '_id' || key == 'name') {
            continue
          }
          if (key == 'dob') {
            let d = new Date(value);
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            test_arr.push(`${da}-${mo}-${ye}`)
          } else {
            test_arr.push(value)
          }
        }
      }
    }
    test_arr[7] = '<a href="view-user.html?id=' + element._id + '" class="btn btn-dark btn-block">View <i class="fas fa-eye"></i></a>'
    arr.push(test_arr)
  });
  load_spinner.remove()
  $('#dataTable').DataTable({
    data: arr,
    columns: [
      { title: 'Name' },
      { title: 'Mobile' },
      { title: 'Profile Completion' },
      { title: 'DOB' },
      { title: 'Gender' },
      { title: 'Profile Verified' },
      { title: 'City' },
      { title: 'Action' }
    ],
    columnDefs: [{
      "defaultContent": "-",
      "targets": "_all"
    }]
  });
});
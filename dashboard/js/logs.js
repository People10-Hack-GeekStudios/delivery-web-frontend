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

async function user_count(){
  let main_data
  await fetch(base_url + '/user/' + version + '/profile/logs/admin', {
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
      if(data.response_code==200){
        main_data = data.response.data
      } else if (data.response_code==401 || data.response_code==403){
          window.location.href = "logout.html";
      }
    })
    .catch(err => { console.log(err); });

    return main_data
}

$(document).ready(async function() {
  let data = await user_count()
  let arr = []
  data.forEach(element => {
    let test_arr = []
    for (const [key, value] of Object.entries(element)) {
      test_arr.push(value)
    }
    arr.push(test_arr)
  });
  $('#dataTable').DataTable({
    data: arr,
    columns: [
      { title: 'Date' },
      { title: 'IP' },
      { title: 'Route' },
      { title: 'Action' }
    ],
    columnDefs: [{
      "defaultContent": "-",
      "targets": "_all"
    }]
  });
});
let base_url = 'https://dev.minematrimony.app'
let version = 'v1'

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

// Form Validation

$("#form").submit(async function (event) {
  event.preventDefault()

  var and_min = document.form1.and_min.value;
  var and_lat = document.form1.and_lat.value;
  var ios_min = document.form1.ios_min.value;
  var ios_lat = document.form1.ios_lat.value;
  var lat_fea = document.form1.lat_fea.value;
  var btn = document.form1.btn;
  var msg = document.getElementById('msg');

  let _data = {
  }

  btn.disabled = true;

  if (lat_fea != '') {
    lat_fea = lat_fea.split(",").map(function (item) {
      return item.trim();
    });
    _data.new_feature_list = lat_fea
  }

  if (and_min != '') {
    _data.android_app_min_version = and_min
  }

  if (and_lat != '') {
    _data.android_app_latest_version = and_lat
  }

  if (ios_min != '') {
    _data.ios_app_min_version = ios_min
  }

  if (ios_lat != '') {
    _data.ios_app_latest_version = ios_lat
  }

  await fetch(base_url + '/user/' + version + '/app/info/update', {
    method: "POST",
    body: JSON.stringify(_data),
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
        msg.innerHTML = '<div class="alert alert-success" role="alert">'+data.message+'</div>'
        window.location.href = "./";
      } else if (data.response_code == 400 || data.response_code == 500) {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">'+data.message+'</div>'
        btn.disabled = false;
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">'+data.message+'</div>'
        btn.disabled = false;
      }
    })
    .catch(err => { console.log(err); });
})
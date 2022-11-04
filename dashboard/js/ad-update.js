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

function setSelectedValue(selectObj, valueToSet) {
  for (var i = 0; i < selectObj.options.length; i++) {
    if (selectObj.options[i].value == valueToSet) {
      selectObj.options[i].selected = true;
      var event = new Event('change');
      selectObj.dispatchEvent(event);
      return;
    }
  }
}

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

if (id === undefined || id == '' || queryString === '') {
  alert('ID is required in the url.')
  window.location.href = "ads.html";
}

let info_data
let ad_data
let cont_index = -1
let st_index = -1

var country = document.getElementById('country');
var state = document.getElementById('state');
var city = document.getElementById('city');

const loader = async () => {

  await fetch(base_url + '/info/' + version + '/get/info/admin', {
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
        let cont_apt = '<option value="">Select Country</option>'
        info_data = data
        data.response.categories.country.sub_division.forEach(element => {
          let temp = {}
          temp.label = element.label
          temp.code = element.code
          cont_apt += "<option value='" + JSON.stringify(temp) + "'>" + temp.label + "</option>"
        });
        country.innerHTML = cont_apt
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else {
        alert('Something went wrong at the server, please try after sometme.')
        window.location.href = "ads.html";
      }
    })
    .catch(err => { console.log(err); });

  await fetch(base_url + '/user/' + version + '/ad/get/' + id, {
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
        ad_data = data.response

        document.getElementById('del_button').innerHTML = '<a href="ad-delete.html?id=' + id + '" class="btn btn-danger btn-block">Delete this ad <i class="fas fa-trash-alt"></i></a>'

        var arr = ['name', 'email', 'number', 'website', 'description', 'owner_name', 'owner_number', 'owner_email', 'location', 'radius']

        setSelectedValue(country, JSON.stringify(data.response.country));
        setSelectedValue(state, JSON.stringify(data.response.state));
        setSelectedValue(city, JSON.stringify(data.response.city));
        document.form1.lat.value = data.response.geojson.coordinates[1]
        document.form1.lon.value = data.response.geojson.coordinates[0]
        document.getElementById('image_modal').innerHTML = '<p><b>Image 1</b> : <a target="_blank" href="' + data.response.banner_image.original + '"> View <i class="fas fa-eye"></i></a></p>*If you want to update the banner image then please add a new file by pressing Choose File button, the image will be updated automatically once you press the update button.'
        if (data.response.banner_video) {
          document.getElementById('video_modal').innerHTML = '<p><b>Video 1</b> : <a target="_blank" href="' + data.response.banner_video.original + '"> View <i class="fas fa-eye"></i></a></p>*If you want to update the banner video then please add a new file by pressing Choose File button, the video will be updated automatically once you press the update button.'
        } else {
          document.getElementById('video_modal').innerHTML = '<p>No Videos uploaded</p>*If you want to update the banner video then please add a new file by pressing Choose File button, the video will be updated automatically once you press the update button.'
        }
        arr.forEach(element => {
          if (data.response[element]) {
            document.form1[element].value = data.response[element]
          }
        });
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else if (data.response_code == 404 || data.response_code == 400) {
        alert(data.message)
        window.location.href = "ads.html";
      } else {
        alert('Something went wrong at the server, please try after sometme.')
        window.location.href = "ads.html";
      }
    })
    .catch(err => {
      console.log(err);
      alert('Something went wrong at the server, please try after sometme.')
      window.location.href = "ads.html";
    });
}

loader()

document.getElementsByTagName('select')[0].onchange = function () {
  var index = this.selectedIndex;
  cont_index = index
  var inputText = this.children[index].value.trim();
  if (inputText == '') {
    state.innerHTML = '<option value="">Select State</option>'
    city.innerHTML = '<option value="">Select City</option>'
  } else {
    let st_apt = '<option value="">Select State</option>'
    info_data.response.categories.country.sub_division[cont_index - 1].sub_division.forEach(element => {
      let temp = {}
      temp.label = element.label
      temp.code = element.code
      st_apt += "<option value='" + JSON.stringify(temp) + "'>" + temp.label + "</option>"
    });
    state.innerHTML = st_apt
  }
}

document.getElementsByTagName('select')[1].onchange = function () {
  var index = this.selectedIndex;
  var inputText = this.children[index].value.trim();
  st_index = index
  if (inputText == '') {
    city.innerHTML = '<option value="">Select City</option>'
  } else {
    let ct_apt = '<option value="">Select City</option>'
    info_data.response.categories.country.sub_division[cont_index - 1].sub_division[st_index - 1].sub_division.forEach(element => {
      let temp = {}
      temp.label = element.label
      temp.code = element.code
      ct_apt += "<option value='" + JSON.stringify(temp) + "'>" + temp.label + "</option>"
    });
    city.innerHTML = ct_apt
  }
}

// Form Validation

$("#form").submit(async function (event) {
  event.preventDefault()

  var btn = document.form1.btn;
  var msg = document.getElementById('msg');

  btn.disabled = true;
  btn.value = 'Submitting'

  var image = document.getElementById('image')
  var video = document.getElementById('video')

  let img
  let vid
  let error = -1

  if (!(image.files[0] === undefined)) {

    var img_data = new FormData()
    img_data.append('file', image.files[0])

    await fetch(base_url + '/upload/' + version + '/images', {
      method: "POST",
      body: img_data,
      headers: {
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
          img = data.response[0]
        } else {
          msg.innerHTML = '<div class="alert alert-danger" role="alert">' + data.message + '</div>'
          btn.disabled = false;
          btn.value = 'Update'
          msg.focus()
          error = 1;
        }
      })
      .catch(err => {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">Size should not exceed 8MB and the file formats should be (png,jpg,jpeg or bmp).</div>'
        btn.disabled = false;
        btn.value = 'Update'
        msg.focus()
        error = 1;
        console.log(err);
      });
  } else {
    img = ad_data.banner_image
  }

  if (!(video.files[0] === undefined)) {

    var vid_data = new FormData()
    vid_data.append('file', video.files[0])

    await fetch(base_url + '/upload/' + version + '/videos', {
      method: "POST",
      body: vid_data,
      headers: {
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
          vid = data.response[0]
        } else {
          msg.innerHTML = '<div class="alert alert-danger" role="alert">' + data.message + '</div>'
          btn.disabled = false;
          btn.value = 'Update'
          msg.focus()
          error = 1;
        }
      })
      .catch(err => {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">Size should not exceed 10MB and the file formats should be (webm,mpeg,ogg,mp4,avi,mov or wmv).</div>'
        btn.disabled = false;
        btn.value = 'Update'
        msg.focus()
        error = 1;
        console.log(err);
      });
  } else {
    if (ad_data.banner_video) {
      vid = ad_data.banner_video
    }
  }

  if (error == 1) {
    return
  }

  let _data = {
  }

  var arr = ['name', 'email', 'number', 'website', 'description', 'owner_name', 'owner_number', 'owner_email', 'country', 'state', 'city', 'location', 'lat', 'lon', 'radius']

  arr.forEach(element => {
    if (document.form1[element].value != '') {
      if (element == 'country' || element == 'state' || element == 'city') {
        _data[element] = JSON.parse(document.form1[element].value)
      } else if (element == 'lat' || element == 'lon' || element == 'radius') {
        _data[element] = parseInt(document.form1[element].value)
      } else {
        _data[element] = document.form1[element].value
      }
    }
  })

  if (img) {
    _data.banner_image = img
  }

  if (vid) {
    _data.banner_video = vid
  }

  await fetch(base_url + '/user/' + version + '/ad/update/' + id, {
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
        msg.innerHTML = '<div class="alert alert-success" role="alert">' + data.message + '</div>'
        btn.disabled = false;
        btn.value = 'Update'
        msg.focus()
        window.location.href = "./";
      } else if (data.response_code == 400 || data.response_code == 500) {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">' + data.message + '</div>'
        btn.disabled = false;
        btn.value = 'Update'
        msg.focus()
        btn.disabled = false;
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">' + data.message + '</div>'
        btn.disabled = false;
        btn.value = 'Update'
        msg.focus()
        btn.disabled = false;
      }
    })
    .catch(err => {
      msg.innerHTML = '<div class="alert alert-danger" role="alert">Server error, please try after sometime.</div>'
      btn.disabled = false;
      btn.value = 'Update'
      msg.focus()
      btn.disabled = false;
      console.log(err);
    });
})
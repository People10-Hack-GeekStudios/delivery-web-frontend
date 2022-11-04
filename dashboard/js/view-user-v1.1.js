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

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

if (id === undefined || id == '' || queryString === '') {
  alert('ID is required in the url.')
  window.location.href = "users.html";
}

// if (!library)
//   var library = {};

// library.json = {
//   replacer: function (match, pIndent, pKey, pVal, pEnd) {
//     var key = '<span class=json-key>';
//     var val = '<span class=json-value>';
//     var str = '<span class=json-string>';
//     var r = pIndent || '';
//     if (pKey)
//       r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
//     if (pVal)
//       r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
//     return r + (pEnd || '');
//   },
//   prettyPrint: function (obj) {
//     var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
//     return JSON.stringify(obj, null, 3)
//       .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
//       .replace(/</g, '&lt;').replace(/>/g, '&gt;')
//       .replace(jsonLine, library.json.replacer);
//   }
// };

async function user() {

  let name = document.getElementById("name")
  let bio = document.getElementById("bio")
  let content = document.getElementById("user_data")
  let image = document.getElementById("image")
  let image_number = document.getElementById("image_number")
  let gender = document.getElementById("gender")
  let number = document.getElementById("number")
  let marital_status = document.getElementById("marital_status")
  let dob = document.getElementById("dob")
  let block_button_div = document.getElementById("block-button-div")
  let report_button_div = document.getElementById("report-button-div")
  let images_div = document.getElementById("images-div")
  let reportings_div = document.getElementById("reportings-div")

  //Personal details
  let height = document.getElementById("height")
  let religion = document.getElementById("religion")
  let caste = document.getElementById("caste")
  let country = document.getElementById("country")
  let state = document.getElementById("state")
  let city = document.getElementById("city")
  let lat = document.getElementById("lat")
  let lon = document.getElementById("lon")
  let loc = document.getElementById("loc")
  let astro_sign = document.getElementById("astro_sign")
  let email = document.getElementById("email")
  let facebook = document.getElementById("facebook")
  let instagram = document.getElementById("instagram")

  //Edu & Job details
  let education = document.getElementById("education")
  let university = document.getElementById("university")
  let college = document.getElementById("college")
  let job = document.getElementById("job")
  let comp_name = document.getElementById("comp_name")
  let comp_loc = document.getElementById("comp_loc")

  //Interest details
  let music = document.getElementById("music")
  let film = document.getElementById("film")

  //App info details
  let profile_verified = document.getElementById("profile_verified")
  let is_blocked = document.getElementById("is_blocked")
  let creation_ip = document.getElementById("creation_ip")
  let created_at = document.getElementById("created_at")
  let updated_at = document.getElementById("updated_at")
  let updation_ip = document.getElementById("updation_ip")
  let profile_completion = document.getElementById("profile_completion")

  let _data = {
    id: id
  }

  await fetch(base_url + '/user/' + version + '/profile/specific/get', {
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

        name.innerHTML = (data.response.data.name) ? (data.response.data.name.charAt(0).toUpperCase() + data.response.data.name.slice(1)) : 'Profile not completed'
        bio.innerHTML = (data.response.data.bio) ? data.response.data.bio : 'Profile not completed'
        gender.innerHTML = (data.response.data.gender) ? data.response.data.gender.label : '-'
        number.innerHTML = (data.response.data.phone) ? '<a target="_blank" href="tel:' + data.response.data.phone + '">' + data.response.data.phone + '</a>' : '-'
        marital_status.innerHTML = (data.response.data.marital_status) ? data.response.data.marital_status.label : '-'

        //personal
        height.innerHTML = (data.response.data.height) ? data.response.data.height.label : '-'
        religion.innerHTML = (data.response.data.religion) ? data.response.data.religion.label : '-'
        caste.innerHTML = (data.response.data.caste) ? data.response.data.caste.label : '-'
        country.innerHTML = (data.response.data.country) ? data.response.data.country.label : '-'
        state.innerHTML = (data.response.data.state) ? data.response.data.state.label : '-'
        city.innerHTML = (data.response.data.city) ? data.response.data.city.label : '-'
        lat.innerHTML = (data.response.data.geojson.coordinates && data.response.data.geojson.coordinates.length == 2) ? data.response.data.geojson.coordinates[1] : '-'
        lon.innerHTML = (data.response.data.geojson.coordinates && data.response.data.geojson.coordinates.length == 2) ? data.response.data.geojson.coordinates[0] : '-'
        loc.innerHTML = (data.response.data.location) ? data.response.data.location : '-'
        astro_sign.innerHTML = (data.response.data.astro_sign) ? data.response.data.astro_sign : '-'
        email.innerHTML = (data.response.data.email) ? '<a target="_blank" href="mailto:' + data.response.data.email + '">' + data.response.data.email + '</a>' : '-'
        facebook.innerHTML = (data.response.data.facebook) ? '<a target="_blank" href="' + data.response.data.facebook + '">' + data.response.data.facebook + '</a>' : '-'
        instagram.innerHTML = (data.response.data.instagram) ? '<a target="_blank" href="' + data.response.data.instagram + '">' + data.response.data.instagram + '</a>' : '-'

        //edu & job
        education.innerHTML = (data.response.data.education) ? data.response.data.education.label : '-'
        university.innerHTML = (data.response.data.university) ? data.response.data.university.label : '-'
        college.innerHTML = (data.response.data.college) ? data.response.data.college.label : '-'
        job.innerHTML = (data.response.data.job) ? data.response.data.job.label : '-'
        comp_name.innerHTML = (data.response.data.company_name) ? data.response.data.company_name : '-'
        comp_loc.innerHTML = (data.response.data.company_location) ? data.response.data.company_location : '-'

        //app info
        is_blocked.innerHTML = (data.response.data.is_blocked) ? '<span class="red">Blocked</span>' : '<span class="green">Not Blocked</span>'
        profile_verified.innerHTML = (data.response.data.profile_verified) ? '<span class="green">Verified</span>' : '<span class="red">Not Verified</span>'
        created_at.innerHTML = data.response.data.created_at
        creation_ip.innerHTML = data.response.data.creation_ip
        updated_at.innerHTML = data.response.data.updated_at
        updation_ip.innerHTML = data.response.data.updation_ip

        let prof_val = ''
        switch (data.response.data.profile_completion) {
          case 0: prof_val = '<span class="red">0%</span>'; break;
          case 1: prof_val = '<span class="orange">25%</span>'; break;
          case 2: prof_val = '<span class="orange">50%</span>'; break;
          case 3: prof_val = '<span class="orange">75%</span>'; break;
          case 4: prof_val = '<span class="green">100%</span>'; break;
        }
        profile_completion.innerHTML = prof_val

        //family
        if (data.response.data.family) {
          for (const [key, value] of Object.entries(data.response.data.family)) {

            if (key == 'siblings') {
              document.getElementById(key).innerHTML = value.length
            } else if (key == 'family_type') {
              document.getElementById(key).innerHTML = value.label
            } else {
              document.getElementById(key).innerHTML = value
            }

          }
        }

        console.log(data.response.data)

        block_button_div.innerHTML = (data.response.data.is_blocked) ? '<button onclick="blocker()" id="block-button" class="btn btn-success btn-block">Un-Block User <i class="fas fa-unlock"></i></button>' : '<button onclick="blocker()" id="block-button" class="btn btn-danger btn-block">Block User <i class="fas fa-ban"></i></button>'

        report_button_div.innerHTML = (data.response.data.reportings) ? '<a href="#" data-toggle="modal" data-target="#reportingsModal" id="report-button" class="btn btn-success btn-block">View Reports <i class="fas fa-eye"></i></a>' : ''

        if (data.response.data.interests) {
          data.response.data.interests.forEach(element => {
            if (element.code == 'music') {
              let temp = ''
              element.sub_division.forEach(element => {
                temp = temp + element.label + ','
              })
              temp = temp.slice(0, -1)
              music.innerHTML = temp
            } else if (element.code == 'film') {
              let temp = ''
              element.sub_division.forEach(element => {
                temp = temp + element.label + ', '
              })
              temp = temp.slice(0, -2)
              film.innerHTML = temp
            }
          });
        }

        if (data.response.data.dob) {
          let d = new Date(data.response.data.dob);
          let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
          let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
          let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
          dob.innerHTML = `${da}-${mo}-${ye}`
        }
        let im_div = ''
        let img = ''
        if (data.response.data.profile_images && data.response.data.profile_images.length > 0) {
          let i = 1
          data.response.data.profile_images.forEach(element => {
            im_div += '<p><b>Image ' + i + '</b> : <a target="_blank" href="' + element.original + '"> View <i class="fas fa-eye"></i></a></p>'
            i += 1
            if (element.is_profile) {
              img = element.thumbnail
            }
          });
          if (img == '') {
            img = data.response.data.profile_images[0].thumbnail
          }
          image.src = img
          image_number.innerHTML = data.response.data.profile_images.length
        }
        if (img == '') {
          image.src = 'img/blank-profile.png'
        }
        images_div.innerHTML = (im_div == '') ? '<p>No Images</p>' : im_div

        let rep_div = ''
        if (data.response.data.reportings) {
          let i = 1
          data.response.data.reportings.reportings.forEach(element => {
            rep_div += '<p><b>Report '+ i +'</b> </p><hr>'
            rep_div += '<p><b>Reason</b> : '+ element.reason.label  +'</p>'
            rep_div += '<p><b>Additional Info</b> : '+ element.additional_info  +'</p>'
            let c = 1
            element.images.forEach(element => {
              rep_div += '<p><b>Image ' + c + '</b> : <a target="_blank" href="' + element + '"> View <i class="fas fa-eye"></i></a></p>'
              c += 1
            })
            rep_div += '<a target="_blank" href="view-user?id='+ element.reporter  +'" class="btn btn-success btn-block">View Reporter <i class="fas fa-eye"></i></a><br>'
            i += 1
          });
        }
        reportings_div.innerHTML = (rep_div == '') ? '<p>No Reportings</p>' : rep_div
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else if (data.response_code == 404 || data.response_code == 400) {
        alert(data.message)
        window.location.href = "users.html";
      } else{
        alert('Something went wrong at the server, please try after sometme.')
        window.location.href = "users.html";
      }
    })
    .catch(err => {
      console.log(err);
      alert('Something went wrong at the server, please try after sometme.')
      window.location.href = "users.html";
    });
}

const blocker = async () => {

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')

  let _data = {
    id: id
  }

  await fetch(base_url + '/user/' + version + '/profile/block/admin', {
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
    })
    .then(data => {
      if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else {
        alert(data.message)
        location.reload()
      }
    })
    .catch(err => { console.log(err); });

}

user()
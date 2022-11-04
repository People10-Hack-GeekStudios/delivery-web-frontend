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

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

if (id === undefined || id == '' || queryString === '') {
  alert('ID is required in the url.')
  window.location.href = "ads.html";
};

const deleter = async () => {

  await fetch(base_url + '/user/' + version + '/ad/delete/' + id, {
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
      if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else {
        alert(data.message)
        window.location.href = "ads.html";
      }
    })
    .catch(err => {
      console.log(err);
      alert('Something went wrong at the server, please try after sometme.')
      window.location.href = "ads.html";
    });
}

deleter()
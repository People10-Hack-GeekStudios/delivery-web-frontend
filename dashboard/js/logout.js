let base_url = 'https://dev.minematrimony.app'
let version = 'v1'

function setCookie(cname, cvalue) {
  const d = new Date();
  d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

async function logout() {
  await fetch(base_url + '/auth/' + version + '/logout/admin', {
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
        setCookie('access-token', 0)
        window.location.href = "../";
      } else if (data.response_code == 401) {
        setCookie('access-token', 0)
        window.location.href = "../";
      } else {
        setCookie('access-token', 0)
        window.location.href = "../";
      }
    })
    .catch(err => {
      console.log(err);
      setCookie('access-token', 0)
      window.location.href = "../";
    });
}

logout();
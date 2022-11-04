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

  var password = document.form1.password;
  var confirm_password = document.form1.confirm_password;
  var btn = document.form1.btn;
  var msg = document.getElementById('msg');

  btn.disabled = true;

  if (password.value.length < 8) {
    msg.style.display = 'block';
    msg.style.background = '#ff3333'
    msg.innerHTML = "Please enter a valid password";
    btn.disabled = false;
    password.focus();
    return false;
  } else {
    if (confirm_password.value != password.value) {
      msg.style.display = 'block';
      msg.style.background = '#ff3333'
      msg.innerHTML = "Password and confirm password should be same";
      btn.disabled = false;
      confirm_password.focus();
      return false;
    } else {

      let _data = {
        pass: password.value
      }

      await fetch(base_url+'/auth/'+version+'/password/change/admin', {
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
            msg.style.display = 'block';
            msg.style.background = '#019e56'
            msg.innerHTML = data.message
            window.location.href = "/";
          }else if (data.response_code == 400 || data.response_code == 500) {
            msg.style.display = 'block';
            msg.style.background = '#ff3333'
            msg.innerHTML = "Data validation error"
            btn.disabled = false;
            password.focus();
          } else {
            msg.style.display = 'block';
            msg.style.background = '#ff3333'
            msg.innerHTML = data.message
            btn.disabled = false;
            password.focus();
          }
        })
        .catch(err => { console.log(err); });
    }
  }
})

// ParticlesJS Config.
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#EF6F6F"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.1,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 6,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.1,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 1.5,
      "direction": "top",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
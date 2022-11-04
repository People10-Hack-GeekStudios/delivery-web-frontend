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
  await fetch(base_url + '/user/' + version + '/profile/all/images/get', {
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

function lazyloadit(){
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
}

$(document).ready(async function () {
  let load_spinner = document.getElementById("load_spinner")
  let data = await users()
  let images_div = document.getElementById("images-div")
  let temp_images = ''
  data.forEach(element => {
    if(element.profile_images){
      element.profile_images.forEach(new_element => {
        temp_images += '<a class="text-decoration-none lazy-div" href="view-user.html?id=' + element._id + '" target="_blank"><img class="lazy lazyy" data-src="'+ new_element.thumbnail +'" /></a>'
      })
    }
  });
  load_spinner.remove()
  images_div.innerHTML = temp_images
  lazyloadit()
});
let base_url = 'https://api.fud4.me'
let version = 'v1'

const deliverySocket = new WebSocket("wss://139.59.40.84:3028/?token=" + getCookie('access-token'), "protocolOne");

let ws_status_p = document.getElementById('ws-status')
let ws_div = document.getElementById('ws-div')

let processing_ids = []

deliverySocket.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  msg.forEach(element => {
    let order_temp = `<div class="col-xl-4 col-md-6 mb-4" id="` + element._id + `">
    <div class="card border-left-primary shadow h-100 py-2">
        <a class="text-decoration-none" style="cursor: pointer;" onclick="process_order('`+ element._id + `')">
            <div class="card-body">
                <div class="row no-gutters align-items-center" id="auth_service">
                <div class="h4 mt-1 mb-0 text-gray-800 text-align-center">Order for `+ element.order.length + ` items
                                               &nbsp; <i class="fas fa-utensils"></i>
                                                <br>`;
    let temp_id = 0
    element.order.forEach(ele => {
      if (temp_id == 0) {
        order_temp += `<p style="font-size: 18px;padding-top:15px;">◦ <img src="` + ele.food.image + `" width="50"> - Quantity <b>` + ele.quantity + `</b></p>`
      } else {
        order_temp += `<p style="font-size: 18px;margin-top: -4px;">◦ <img src="` + ele.food.image + `" width="50"> - Quantity <b>` + ele.quantity + `</b></p>`
      }
      temp_id += 1
    })
    order_temp += `</div></div></div></a></div></div>`;
    if (!processing_ids.includes(element._id)) {
      processing_ids.push(element._id)
      ws_div.innerHTML += order_temp
    }
    // console.log(element.order)
  });
};

deliverySocket.onclose = (event) => {
  ws_status_p.style.backgroundColor = 'red'
  ws_status_p.innerHTML = 'WebSocket Not Connected'
};

deliverySocket.onopen = (event) => {
  ws_status_p.style.backgroundColor = '#019e56'
  ws_status_p.innerHTML = 'WebSocket Connected'
};

deliverySocket.onerror=function(event){
  console.log(event);
}

const process_order = async (id) => {
  if (confirm('Do you want to mark this order as ready?')) {
    let _data = {}
    _data.id = id
    await fetch(base_url + '/user/' + version + '/order/ready', {
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
        if (data.response_code == 401 || data.response_code == 403) {
          window.location.href = "logout.html";
        } else {
          alert(data.message)
          document.getElementById(id).remove()
          processing_ids.splice(processing_ids.indexOf(id), 1)
        }
      })
      .catch(err => {
        alert('Error')
      });
  }
}
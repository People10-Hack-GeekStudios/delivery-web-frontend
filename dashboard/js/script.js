let base_url = 'https://api.fud4.me'
let version = 'v1'
// Specifies a license, you can visit https://www.dynamsoft.com/customer/license/trialLicense?ver=9.2.13&utm_source=github&product=dbr&package=js to get your own trial license good for 30 days. 
Dynamsoft.DBR.BarcodeReader.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxNDMyMTEwLVRYbFhaV0pRY205cVgyUmljZyIsIm9yZ2FuaXphdGlvbklEIjoiMTAxNDMyMTEwIiwiY2hlY2tDb2RlIjotMTUyNDk0MjE3fQ==';
// Initializes and uses the SDK

const open_qr = async () => {
  let scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
  scanner.onFrameRead = results => {
    if (results.length > 0) console.log(results);
  };
  scanner.onUniqueRead = async (txt, result) => {
    if(confirm("Do you want to mark this order as delivered ?")){
      let _data = {}
      _data.id = txt
      await fetch(base_url + '/user/' + version + '/order/deliver', {
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
          }
        })
        .catch(err => {
          alert('Error')
        });
    }
  };
  await scanner.show();
}
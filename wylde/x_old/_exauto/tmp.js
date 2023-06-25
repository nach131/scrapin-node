var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://www.wyylde.com/rest/mc/3386629/album/0?nocache=1677227835635&version=4.1.0',
  headers: { 
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGV0bSI6MTY2NDU1OTAwOCwiX19pZCI6IjQ3NzE1MDMiLCJfX25hbWUiOiJzb3BoaWVibG9uZGUiLCJfX3N0YXRlcyI6W10sInBhc3N3b3JkX3VwZGF0ZWQiOnsicGFzc3dvcmRfdXBkYXRlZF9kdCI6bnVsbH19.DbjDoA0S7qY16I-y0up7-2JBGwA5QUgLaZaXtzdEE70', 
    'Cookie': 'AWSALB=/I60HVeEUcIght8n9FvlPLs6uxqyAR61gnuyzceKPdkRMeKlzPrwZQGDo2oi55sctFvV/9pt3rLH+1jtp1d9RW8BTJV9IY5Tq75Oc7pgNBVtME82lE3Vjq6T5u3j; AWSALBCORS=/I60HVeEUcIght8n9FvlPLs6uxqyAR61gnuyzceKPdkRMeKlzPrwZQGDo2oi55sctFvV/9pt3rLH+1jtp1d9RW8BTJV9IY5Tq75Oc7pgNBVtME82lE3Vjq6T5u3j'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

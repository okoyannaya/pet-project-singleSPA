import axios from 'axios'

axios({
    method: 'get',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation&past_days=2',
    responseType: 'stream'
  })
    .then((response)=> {
       console.log(response.data)
    });
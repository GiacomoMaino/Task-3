const express = require('express')
const axios = require('axios')
const luxon = require('luxon')
const constants = require('./const')

const DateTime = luxon.DateTime
const API_KEY = constants.API_KEY

const app = express()
const port = 3000

const clearForecast = (forecast) => {
    const out = {
        "main": forecast.main,
        "weather": [
            {
                "main": forecast.weather[0].main,
                "description": forecast.weather[0].description
            }
        ]
    }

    return out
}

app.get('/weather', (req, res) => {

    const to_search = DateTime.fromFormat(req.query.date, "dd-MM-yyyy")
    const now       = DateTime.now()
    const today     = DateTime.fromISO(now.toISODate())

    if(today.plus({days:5}) < to_search && today.minus({days: 5}) > to_search)
    {
        res.send({"status": 410, "statusText": "Gone"})
    }

    let forecast = null
    axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+req.query.city+'&appid='+API_KEY)
    .then(response => {
        const forecasts = response.data
        forecasts.list.forEach(element => {
            let date = DateTime.fromMillis(element.dt * 1000);
            if(date.toISODate() == to_search.toISODate())
            {
                forecast = element
            }
        });
        res.send(clearForecast(forecast))
    })
    .catch(error =>{
        res.send(error)
    })

});

app.listen(port, () => console.log(`Service is running on port ${port}!`))
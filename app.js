'use strict'

const yargs = require('yargs')
const geocode =  require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs.options({
    a: {
        demand:true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help','h')
.argv

geocode.geocodeAddress(argv.a)
.then((results)=>{
    console.log(`address: ${results.formatted_address}`)
    return weather.getWeather(results.geometry.location.lat,results.geometry.location.lng)
}).then((data)=>{
    console.log(JSON.stringify(data,undefined,2))
}).catch((error)=>{
    console.log(error)
})
'use strict'

const yargs = require('yargs')
const axios =  require('axios')

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


axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}&key=AIzaSyBnM8nUHXUAH3YKT0gB9O55R6q1hMvqFts`)
.then((response)=>{
    if(response.data.status==='ZERO_RESULTS'){
        throw new Error('Unable to find the address!')
    }
    console.log(response.data.results[0].formatted_address)
    const lat = response.data.results[0].geometry.location.lat
    const lng = response.data.results[0].geometry.location.lng
    return axios.get(`https://api.darksky.net/forecast/41983fffd1afd4d47892d69f9c839fa7/${lat},${lng}`)
}).then((response)=>{
        console.log(response.data.currently)
}).catch(error=>{
    if(error.code === 'ENOTFOUND'){
        console.log('Unable to connetc to API servers!')
    }else{
        console.log(error)
    }   
})
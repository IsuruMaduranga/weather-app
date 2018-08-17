'use strict'

const request = require('request')

const geocodeAddress = (address)=>{
    return new Promise((resolve,reject)=>{
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBnM8nUHXUAH3YKT0gB9O55R6q1hMvqFts`,
            json: true
        },(error,response,body)=>{
            if(error){
                throw new Error('Unable to connect to Google servers!')
            }else if(body.status==='ZERO_RESULTS'){
                throw new Error('Unable to find the address!')
            }else if(body.status==='OK'){
                resolve(body.results[0])
            }else{
                throw new Error('Cannot fetch address data!')
            }
        })
    })
    
}

module.exports={
    geocodeAddress
}


'use strict'

//41983fffd1afd4d47892d69f9c839fa7

const request = require('request')

const getWeather = (lat,lng)=>{
    return new Promise((resolve,reject)=>{
        request({
            url: `https://api.darksky.net/forecast/41983fffd1afd4d47892d69f9c839fa7/${lat},${lng}`,
            json: true
        },(error,response,body)=>{
            if(error){
                throw new Error('Unable to connect to Forcast servers!')
            }else if(response.statusCode===400){
                throw new Error(body.error)
            }else if(response.statusCode===200){
                resolve(body.currently)  
            }else{
                throw new Error('cannot fetch weather data!')
            }
        })
    })
    
}

module.exports={
    getWeather
}
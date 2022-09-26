// gets express framework (node)
const express = require("express")
// gets 
const https = require("https")
// uses express to connect with any requests
const app = express();

// we must include https
const url = "https://api.openweathermap.org/data/2.5/weather?q=Illinois&appid=269fe1ca83aa111b34b2e69d26ed3aff&units=metric";

// whenever a user goes to the page we send back a request
app.get("/", function (req, res) {

// how we grab data from api
    https.get(url, function (response) {
        console.log(response.statusCode)

        // how we manipulate the data to be displayed
        response.on("data", function(data) {

            // gives us an object of the json object
         const weatherData = JSON.parse(data)

         const temp = weatherData.main.temp

         const weatherDescription = weatherData.weather[0].description

         const iconLink = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"

        //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BRILLIANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         res.write("<p>The weather is currently " + weatherDescription + "</p>")
         res.write("<h1>The temperature in Illinois is " + temp + " degrees Celcius</h1>") 
         res.write("<img src="+iconLink+">")
        //  kind of like a return
         res.send();
        })
      })

    //   !!!!!!!!!!!!!!!!!!!we can only have one send request per get request!!!!!!!!!!!!!!!!!!!!!!!!!!
    // res.send("Server is up and runnig")
  })


  app.listen(3000, function () {
    console.log("Server is running on port 3000")
  })
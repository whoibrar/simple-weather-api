const express=require("express");

const bodyParser=require("body-parser");

const https = require("https");

const app=express();

app.use(express.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey="3963bc09feb61aa0e1939a4bfe5ec625";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;


    https.get(url, function(response){
        response.on("data", function(data){
            var weatherData=JSON.parse(data);
            if(weatherData.cod!=200){
                res.send("city not found")
            }else{
                const temp=weatherData.main.temp;
                const weatherDescription=weatherData.weather[0].description;
                const icon=weatherData.weather[0].icon;
                res.write("<p>The weather is currently "+weatherDescription+"</p>");
                res.write("<h1>The temperature in "+query+" is "+temp+" deg celcius.</h1>");
                res.write("<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png' alt='weatherIcon'>");
                res.send();
            }
        })
    })

})



app.listen(process.env.PORT || 3000,function(req, res){
    console.log("Server is running on port 3000");
})



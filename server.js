const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
res.sendFile(__dirname+"/index.html")    
    
});

app.post('/',(req,res)=>{
    const cc= req.body.name1;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cc+"&appid=9d36fe56d4358170d0e6e0959000a10c";
    https.get(url,(response)=>{
          
    response.on("data",(data)=>{
        const wea = JSON.parse(data);
        const temperature = (wea.main.temp)-273.15;
        
        res.send("<h1>The temperature of "+ cc+" is "+temperature);

    })
    
    
    });
    
})
app.listen(301,()=>console.log("server is running on port 3000"));

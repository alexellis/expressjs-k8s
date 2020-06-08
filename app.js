const express = require('express');
const app = express();
const path = require('path');

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/health',function(req,res){
    res.send("OK");
});
  
app.get('/links',function(req,res){
    res.type("json")
    res.send(
        [
            {
                "name": "github",
                "url": "https://github.com/alexellis"
            },
            {
                "name": "twitter",
                "url": "https://twitter.com/alexellisuk"
            },
            {
                "name": "blog",
                "url": "https://blog.alexellis.io"
            },
            {
                "name": "sponsors",
                "url": "https://github.com/users/alexellis/sponsorship"
            },
        ])
});

app.listen(4000, () => {
    console.log(`Express.js listening on port 4000`)
});
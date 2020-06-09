const express = require('express');
const app = express();
const path = require('path');

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/health',function(req,res){
    res.send("OK");
});

app.listen(4000, () => {
    console.log(`Express.js listening on port 4000`)
});
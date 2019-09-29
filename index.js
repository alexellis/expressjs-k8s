// Copyright (c) Alex Ellis 2019. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const express = require('express')
const app = express()
 
const port = process.env.http_port || 8080;

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text({ type : "text/*" }));
app.disable('x-powered-by');       

app.post('/health', (req, res) => {
    res.send("OK");
});

let route = (req, res) => {
    res.type('html')
    res.send(`<html>
            <h3>Hi, thanks for using my Express.js lab 👏</h3>
            <p>If you found it useful, <a href="https://github.com/users/alexellis/sponsorship">become my GitHub Sponsor</a> today 👑</p>
            <p>Alex</p>
            </html>
`);
}

app.post('/*', route);
app.get('/*', route);
app.patch('/*', route);
app.put('/*', route);
app.delete('/*', route);

app.listen(port, () => {
    console.log(`Express.js listening on port: ${port}`)
});    

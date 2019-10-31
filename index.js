// Copyright (c) Alex Ellis 2019. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const express = require('express')
const app = express()
const routes = require ("./routes");

const port = process.env.http_port || 8080;

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text({ type : "text/*" }));
app.disable('x-powered-by');       

app.get('/health', routes.health);
app.get('/links', routes.links);

app.post('/*', routes.main);
app.get('/*', routes.main);
app.patch('/*', routes.main);
app.put('/*', routes.main);
app.delete('/*', routes.main);



app.listen(port, () => {
    console.log(`Express.js listening on port: ${port}`)
});    

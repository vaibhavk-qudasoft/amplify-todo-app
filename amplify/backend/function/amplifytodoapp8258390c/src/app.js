/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");
const { v4: uuidv4 } = require("uuid");
//
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

/**********************
 * Example get method *
 **********************/

app.get("/items", function (req, res) {
    res.json({
        message: "Data fetched successfully",
        data: db.getAll(),
    });
});

app.get("/items/:id", function (req, res) {
    const item = db.getById(req.params.id);
    if (item)
        res.json({
            message: "Data fetched successfully",
            data: item,
        });
    else res.status(404).json({ error: "Item not found" });
});

/****************************
 * Example post method *
 ****************************/

app.post("/items", function (req, res) {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).json({
            message: "title and description required.",
        });
    }
    const newItem = {
        id: uuidv4(),
        title,
        description,
        createdAt: new Date().toISOString(),
    };
    db.create(newItem);
    res.status(201).json(newItem);
});

app.post("/items/*", function (req, res) {
    // Add your code here
    res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/items", function (req, res) {
    // Add your code here
    res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/items/:id", function (req, res) {
    const updatedItem = db.update(req.params.id, req.body);
    if (updatedItem) res.json({ data: updatedItem });
    else res.status(404).json({ error: "Item not found" });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/items", function (req, res) {
    // Add your code here
    res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/items/:id", function (req, res) {
    const deleted = db.delete(req.params.id);
    if (deleted) res.json({ success: true });
    else res.status(404).json({ error: "Item not found" });
});

app.listen(3001, function () {
    console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;

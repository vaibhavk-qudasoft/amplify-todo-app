const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");


// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get("/", (req, res) => {
    res.json({ data: "Ping Successfully" });
});

app.get("/private", (req, res) => {
    res.json({ data: "Ping Successfully" });
});

app.get("/api/v1/todos", (req, res) => {
    res.json({ message: "Ping Successfully", data: [] });
});



app.listen(3001, function () {
    console.log("Application Start");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;

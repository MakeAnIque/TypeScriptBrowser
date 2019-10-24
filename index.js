const express = require("express");
const chalk = require("chalk");

const app = express();

app.use("/static", express.static(__dirname + "/dist"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/ts_static", (req, res) => {
    console.log("okay fetched");
    // console.log(req.query.q);
    res.sendFile(__dirname + "/ts/" + req.query.q);
});

app.listen(8000, () => {
    console.log(chalk.grey("Server is running on port 8000"));
});

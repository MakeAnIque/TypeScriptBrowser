const express = require("express");
const chalk = require("chalk");
const path = require("path");

// load miidleware which check only ts file will come
const { ts_middleware } = require("./dist/middleware_ts");

const app = express();

app.use("/static", express.static(__dirname + "/dist"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// this is main function that load file and to client
app.post("/ts_static", ts_middleware.check_req, (req, res) => {
    // this is 'ts' it is path where you want to store your ts file you can change according to you project file
    res.sendFile(path.join(__dirname, "ts", req.query.q));
});

app.listen(8000, () => {
    console.log(chalk.grey("Server is running on port 8000"));
});

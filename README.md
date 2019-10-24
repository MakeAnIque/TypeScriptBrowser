# TypeScriptBrowser

Run TypeScript Code Directly in browser means you dont need to compile your ts just write code in typescript and load like js file in browser but with custom code

-   Typescript file in browser
-   Not need to compile ts into js
-   load directly into browser

# New Features!

-   compile according to browser like `es6` or `es5` modules supporting
-   this script automatically detect which browser support `es6` or `es5` js module

# How to Development setup

-   Clone the repositories.

```sh
$ git clone https://github.com/amitabh-anandcl/TypeScriptBrowser.git
```

-   now cd into folder

```sh
$ cd TypeScriptBrowser
```

-   now install all dependencies first time all file done

```sh
$ npm install
```

-   `gulp clean` clean build folder

```sh
$ gulp clean
```

-   `gulp compress` compress the typescript.ts file

```sh
$ gulp compress
```

-   `gulp` this default development compile and merge

```sh
$ gulp
```

-   `dist` folder has all script folder that is client side folder and middleware file

```sh
dist/middleware_ts.js - middleware of express check mime type of incomming file
dist/js/static_file.js - client side code fetching ts file from server
dist/js/typescript.js  - typescript.js compiler minified that compile ts into js runtime
```

# How to use

-   `index.html`

```sh
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
    </head>
    <body>
        <!-- id you can choose you want -->
        <div id="ts"></div>

        <script type="text/javascript" src="/static/js/typescript.js"></script>
        <script type="text/javascript" src="/static/js/static_file.js"></script>
        <script type="text/javascript">
            // this is function example and
            window.onload = () => {
                let url_config = {
                    fetch_url: "/ts_static", // fetch url on express server all are post request
                    ts_file: ["index.ts", "main.ts"], // filename in array for sequence loading file
                    inject_id: "ts", // this is div id
                    target: null // this null then automatically check browser js version like es6 , es5 if set to es6 or es5 it will compile only setted value
                };
                // now contruct the class loadscript with send object to it
                let ts_now = new load_typescript(url_config);
            };
        </script>
    </body>
</html>
```

-   `index.js` express server

```sh
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
```

-   `middleware_ts.js` this is loaded in express.js file

# contributing welcome contributers

-   welcome for contributers contributer.

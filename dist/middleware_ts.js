const fs = require("fs");

class middleware {
    constructor() {
        console.log("okay middleware");
    }
    check_req(req, res, next) {
        let mime = req.query.q;

        if (mime.indexOf(".ts") > 0) {
            next();
        } else {
            res.send("false");
        }
    }
}
exports.ts_middleware = new middleware();

const fs = require("fs");

class middleware {
    constructor() {
        console.log("okay middleware");
    }
    /**
     * check mime of incomming request for tpyescript file
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
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

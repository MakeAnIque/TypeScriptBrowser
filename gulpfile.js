const gulp = require("gulp");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;
const fs = require("fs");
const chalk = require("chalk");
const rimraf = require("rimraf");

gulp.task("reset", (cb) => {
    rimraf("./dist/", () => {
        console.log(chalk.red("All done ..."));
        cb();
    });
});

gulp.task("compress", (cb) => {
    console.log(chalk.green("File created Succesfully ..."));

    return pipeline(
        gulp.src("static_file/typescript.js"),
        uglify(),
        gulp.dest("dist/js/")
    );
});

gulp.task("create_file", (cb) => {
    console.log(chalk.green("File main.js created ..."));
    fs.writeFileSync(
        __dirname + "/dist/js/static_file.js",
        "file created start now..."
    );

    cb();
});

exports.reset = gulp.task("reset");
exports.default = gulp.series("compress", "create_file");

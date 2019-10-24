const gulp = require("gulp");
const uglify = require("gulp-uglify-es").default;
const pipeline = require("readable-stream").pipeline;
const fs = require("fs");
const chalk = require("chalk");
const rimraf = require("rimraf");
const path = require("path");

gulp.task("clean", (cb) => {
    rimraf("./build", () => {
        console.log(chalk.red("Build Cleaned ..."));
    });
    cb();
});

gulp.task("compress", (cb) => {
    console.log(chalk.green("File created Succesfully ..."));

    return pipeline(
        gulp.src("static_file/typescript.js"),
        uglify(),
        gulp.dest("dist/js/")
    );
});

gulp.task("create_folder", (cb) => {
    fs.mkdir(path.join(__dirname, "build"), () => {
        console.log(chalk.red("build folder is created"));
    });
    cb();
});

gulp.task("move_script", (cb) => {
    console.log(chalk.red("typescript.js moved"));

    gulp.src(path.join(__dirname, "dist", "js", "typescript.js")).pipe(
        gulp.dest(path.join(__dirname, "build"))
    );

    console.log(chalk.red("middleware_ts.js moved"));

    gulp.src(path.join(__dirname, "dist", "middleware_ts.js")).pipe(
        gulp.dest(path.join(__dirname, "build"))
    );

    console.log(chalk.red("compressing static_file.js and moved"));
    return pipeline(
        gulp.src(path.join(__dirname, "dist", "js", "static_file.js")),
        uglify(),
        gulp.dest(path.join(__dirname, "build"))
    );
    cb();
});

gulp.task("merge_to_typescript", (cb) => {
    let custom_js = fs.readFileSync(
        path.join(__dirname, "build", "static_file.js")
    );

    fs.appendFile(
        path.join(__dirname, "build", "typescript.js"),
        custom_js.toString(),
        (err) => {
            if (err) throw err;

            console.log(
                chalk.grey("file appending done \n now deleting static_file.js")
            );

            fs.unlink(
                path.join(__dirname, "build", "static_file.js"),
                (err) => {
                    console.log(chalk.red("File deleted ..."));
                }
            );
        }
    );
    cb();
});
gulp.task("merge_file", (cb) => {
    cb();
});
exports.clean = gulp.series("clean");
exports.compress = gulp.series("compress");
exports.default = gulp.series("move_script", "merge_to_typescript");

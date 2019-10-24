const gulp = require("gulp");
const uglify = require("gulp-uglify-es").default;
const pipeline = require("readable-stream").pipeline;
const fs = require("fs");
const chalk = require("chalk");
const rimraf = require("rimraf");
const path = require("path");

/**
 * cleaning the all build when wrong goes
 */
gulp.task("clean", (cb) => {
    rimraf("./build", () => {
        console.log(chalk.red("Build Cleaned ..."));
    });
    cb();
});
/**
 * compress the typescript original file into minify typescript file
 */
gulp.task("compress", (cb) => {
    console.log(chalk.green("File created Succesfully ..."));

    // compress file typescript.js imto minify to dist js folder
    return pipeline(
        gulp.src("static_file/typescript.js"),
        uglify(),
        gulp.dest("dist/js/")
    );
});

/**
 * build folder creation for storing all build files in it
 */
gulp.task("create_folder", (cb) => {
    fs.mkdir(path.join(__dirname, "build"), () => {
        console.log(chalk.red("build folder is created"));
    });
    cb();
});
/**
 * move script to build folder and compress the static_file.js because for compiler of typescript with these file no need to load extra file in your html file
 */
gulp.task("move_script", (cb) => {
    console.log(chalk.red("typescript.js moved"));

    // move dist typescript.js to build typescript.js
    gulp.src(path.join(__dirname, "dist", "js", "typescript.js")).pipe(
        gulp.dest(path.join(__dirname, "build"))
    );

    console.log(chalk.red("middleware_ts.js moved"));

    // move from dist middleware_ts.js to build folder
    gulp.src(path.join(__dirname, "dist", "middleware_ts.js")).pipe(
        gulp.dest(path.join(__dirname, "build"))
    );

    console.log(chalk.red("compressing static_file.js and moved"));
    // compress and move into build folder
    return pipeline(
        gulp.src(path.join(__dirname, "dist", "js", "static_file.js")),
        uglify(),
        gulp.dest(path.join(__dirname, "build"))
    );
    cb();
});
/**
 * merging static_file.js minified script to typescript at the end
 * and remove the file static that is in build folder
 */

gulp.task("merge_to_typescript", (cb) => {
    // read file from build  static_file.js
    let custom_js = fs.readFileSync(
        path.join(__dirname, "build", "static_file.js")
    );

    // appending all files into typescript of static_file
    fs.appendFile(
        path.join(__dirname, "build", "typescript.js"),
        custom_js.toString(),
        (err) => {
            if (err) throw err;

            console.log(
                chalk.grey("file appending done \n now deleting static_file.js")
            );

            // now unlink static_file after merging into main file
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

// clean gulp clean
exports.clean = gulp.series("clean");
// compress command gulp command
exports.compress = gulp.series("compress");
// run build script command gulp
exports.default = gulp.series("move_script", "merge_to_typescript");

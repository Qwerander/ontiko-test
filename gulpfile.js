const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const image = require("gulp-imagemin");
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify-es").default;
const del = require("del");
const ifProduct = require("gulp-if");

const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

const arg = require("yargs").argv;

const flag = Boolean(arg.build);

const clean = () => {
  return del(["dist"]);
};

const resources = () => {
  return src("src/resources/**").pipe(dest("dist"));
};

const styles = () => {
  return src("src/styles/**/*.css")
    .pipe(ifProduct(flag, sourcemaps.init()))
    .pipe(concat("main.css"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(ifProduct(flag, sourcemaps.write()))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(["src/js/components/**/*.js", "src/js/main.js"])
    .pipe(ifProduct(flag, sourcemaps.init()))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(
      ifProduct(
        !flag,
        uglify({
          toplevel: true,
        }).on("error", notify.onError())
      )
    )
    .pipe(ifProduct(flag, sourcemaps.write()))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const images = () => {
  return src([
    "src/images/**/*.jpg",
    "src/images/**/*.png",
    "src/images/**/*.jpeg",
    "src/images/*.svg",
  ])
    .pipe(image())
    .pipe(dest("dist/images"));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
};

watch("src/**/*.html", htmlMinify);
watch("src/styles/**/*.css", styles);
watch("src/js/**/*.js", scripts);
watch("src/resources/**", resources);

exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.clean = clean;
exports.default = series(
  clean,
  resources,
  htmlMinify,
  scripts,
  styles,
  images,
  watchFiles
);

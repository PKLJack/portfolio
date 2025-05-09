/*
 * Usage:
 * gulp
 * gulp -T
 * gulp watch
 * */

import fs from "node:fs";

import { src, dest, watch } from "gulp";

const paths = {
  html: {
    src: "src/index.html",
    dest: "dist/",
  },
  css: {
    src: "src/assets/css/*.css",
    dest: "dist/assets/css/",
  },
  js: {
    src: "src/assets/js/*.js",
    dest: "dist/assets/js/",
  },
  favicon: {
    src: "src/assets/favicon/*",
    dest: "dist/assets/favicon/",
  },
  img: {
    src: "src/assets/img/**/*.{jpg,png}",
    dest: "dist/assets/img/",
  },
  svg: {
    src: "src/assets/img/**/*.svg",
    dest: "dist/assets/img/",
  },
};

export function clean(cb) {
  fs.rmSync("dist", { recursive: true });
  cb();
}

export default function build(cb) {
  console.log("Not Implemented.");
  cb();
}

function watch_(cb) {
  watch(paths.html.src, { ignoreInitial: false }, html);
  watch(paths.css.src, { ignoreInitial: false }, css);
  watch(paths.js.src, { ignoreInitial: false }, js);
  cb();
}

function html(cb) {
  src(paths.html.src).pipe(dest(paths.html.dest));
  cb();
}

function js(cb) {
  // TODO: Maybe set sourcemaps to true?
  src(paths.js.src, { sourcemaps: false }) //
    .pipe(dest(paths.js.dest, { sourcemaps: false }));
  cb();
}

function css(cb) {
  src(paths.css.src).pipe(dest(paths.css.dest));
  cb();
}

export function favicon(cb) {
  src(paths.favicon.src, { encoding: false }) //
    .pipe(dest(paths.favicon.dest));
  cb();
}

export function img(cb) {
  // TODO: Consider better naming because of SVG.
  // TODO: Minimize images with imagemagick and svgo
  // TODO: `{encoding: false}` ?

  src(paths.img.src, { encoding: false }).pipe(dest(paths.img.dest));
  src(paths.svg.src, { encoding: false }).pipe(dest(paths.svg.dest));
  cb();
}

export function debug(cb) {
  console.log("Hello from debug");
  cb();
}

export { watch_ as watch };

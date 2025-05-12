/*
 * Usage:
 * gulp
 * gulp -T
 * gulp watch
 * */

import fs from "node:fs";
import https from "node:https";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { src, dest, watch } from "gulp";
import ghpages from "gh-pages";

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
    // src: "src/assets/img/**/*.{jpg,png}",
    src: "src/assets/img/**/*.{jpg,png,webp}",
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

  src(paths.img.src, { encoding: false }).pipe(dest(paths.img.dest));
  src(paths.svg.src, { encoding: false }).pipe(dest(paths.svg.dest));
  cb();
}

export function publish() {
  return ghpages.publish(
    "dist",
    {
      history: false,
      message: "Updates. Auto-generated commit by gh-pages.",
    },
    function (err) {
      if (!err) return;
      console.error(err);
    },
  );
}

export function downloadWebpTools() {
  // ========================================
  // Download tar.gz to tmp
  // ========================================
  const tmpDir = "tmp";
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
  const version = "1.5.0-linux-x86-64"; // TODO: Maybe move to env file
  const tmpFile = path.join(tmpDir, `libwebp-${version}.tar.gz`);

  if (!fs.existsSync(tmpFile)) {
    const url = `https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-${version}.tar.gz`;
    // console.log(`Downloading: ${url}`);
    const writeStream = fs.createWriteStream(tmpFile);

    https
      .get(url, (res) => {
        res.pipe(writeStream);
      })
      .on("error", (err) => {
        console.error(err);
        process.exit(1);
      });
  }

  // ========================================
  // Put cwebp executable to bin
  // ========================================
  const binDir = "bin";
  if (!fs.existsSync(binDir)) fs.mkdirSync(binDir);
  const binFile = path.join(binDir, "cwebp");

  if (!fs.existsSync(binFile)) {
    // prettier-ignore
    const args = [
      "--extract", "--verbose", "--gzip",
      "--file", tmpFile,
      "--directory", binDir,
      "--strip-components", 2,
      `libwebp-${version}/bin/cwebp`,
    ];

    try {
      const stdout = execFileSync("tar", args, {
        stdio: "pipe",
        encoding: "utf8",
      });
      console.log(stdout);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}

export function debug(cb) {
  console.log("Hello from debug");
  cb();
}

export { watch_ as watch };

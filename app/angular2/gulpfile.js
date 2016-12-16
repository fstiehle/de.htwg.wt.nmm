"use strict";

const gulp = require("gulp");
const del = require("del");
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const less = require('gulp-less');
const path = require('path');

const DIST_PATH = "dist";
 
/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del([DIST_PATH], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("ts", ["tslint"], () => {
    let tsResult = tsProject.src() // load files based on tsconfig
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest(DIST_PATH));
});

/**
 * Compile Less to CSS
 */
 gulp.task('less', () => {
     return gulp.src("src/**/*.less")
        .pipe(sourcemaps.init())
        .pipe(less({paths: [
            '.',
            './node_modules/bootstrap-less'
         ]}))
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest(DIST_PATH));
});


/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts", "!**/*.less"])
        .pipe(gulp.dest(DIST_PATH));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            '@angular/**/bundles/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest(DIST_PATH + "/lib"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', () => {
    gulp.watch(["src/**/*.ts"], ['ts']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    
    gulp.watch(["src/**/*.less"], ['less']).on('change', function (e) {
        console.log('Less file ' + e.path + ' has been changed. Compiling.');
    });
    
    gulp.watch(["src/**/*.html"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

/**
 * Build the project.
 */
gulp.task("build", ['ts', 'less', 'resources', 'libs'], () => {
    console.log("Building the project ...");
});
'use strict';
const { src, dest, parallel, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const buildSass = () => {
    console.log('Компиляция SASS');

    return src('dist/scss/common/*.scss')
        .pipe(sass())
        .pipe(dest('build/styles'));
}

const buildPug = () => {
    console.log('Компиляция Pug');

    return src('dist/pages/*.pug')
        .pipe(pug())
        .pipe(dest('build/html'));
}

const browserSyncJob = () => {
    browserSync.init({
        server: "build/"
    });

    watch('dist/scss/common/*.scss', buildSass);
    watch('dist/pages/*.pug', buildPug);
};

exports.server = browserSyncJob;
exports.build = parallel(buildSass, buildPug);

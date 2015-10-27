var gulp = require('gulp');
var livereload = require('gulp-livereload');
var webpack = require('webpack-stream')
var staticHash = require('gulp-static-hash');
var uglify = require('gulp-uglify');
var cordova = require('cordova');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var less = require('gulp-less');

var tasks = {
  webpack: function() {
    return gulp.src('./www/js/index.jsx')
      .pipe(webpack(require('./webpack.config')))
      .pipe(gulp.dest('./www/js/'))
  }
}

gulp.task('webpack', tasks.webpack)

gulp.task('livereload', function() {
  var stream = tasks.webpack()
  var platforms = require('./platforms/platforms.json')
  for (var platform in platforms) {
    stream = stream.pipe(gulp.dest('./platforms/' + platform + '/www/js'))
  }
  return stream.pipe(livereload())
})

gulp.task('watch', ['serve'], function() {
  livereload.listen({port: 35729});
  gulp.watch(['./www/js/**/*.jsx', './www/css/*.css'], ['livereload']);
})

gulp.task('build', function(cb) {
    return runSequence('webpack', 'uglify', 'hash')
})

gulp.task('listMp3', function(cb) {
  var fs = require("fs");
  var files = fs.readdirSync("www/media/");
  var k = 1;
  var floor = [];
  var piano = [];
  files.forEach(function(mp3){
    var note = mp3.replace(/\.mp3$/, '');
    var color = note.length==3 ? 'black' : 'white';
    var octvar = note.slice(-1);
    note = note.slice(0, 1);
    var l = Math.round(Math.random()*400);
    var t = Math.round(Math.random()*400);
    floor.push({color: color, note: note, octvar: octvar, k: k, l: l , t: t});
    piano.push({color: color, note: note, octvar: octvar, k: k, box: null});
    k++;
  });
  console.log("data.floor=" + JSON.stringify(floor, null, " ") + ";");
  console.log("data.piano=" + JSON.stringify(piano, null, " ") + ";");
})

gulp.task('prepare', function(cb) {
    return cordova.prepare(cb)
})

gulp.task('serve', function(cb) {
    return cordova.serve(cb)
})

gulp.task('hash', function() {
    return gulp.src(['www/*.html'])
        .pipe(staticHash({asset: 'www/js'}))
        .pipe(gulp.dest('www'));
});

gulp.task('uglify', function () {
    return gulp.src(['www/js/**/*.js'])
//        .pipe(uglify({
//        	compress: {
//        		global_defs: {
//        		    DEBUG: false
//        		}
//        	}
//        }))
        .pipe(gulp.dest('www/js'));
});

gulp.task('clean', function(cb) {
    return rimraf('./platforms/**/www/js/**/*.jsx', cb)
})

gulp.task('install', function(cb) {
    return cordova.platform('add', ['browser', 'ios', 'android'], cb)
})

//copy the bootstrap to local folder, compile bootstrap.less to css, which is not necessary but learned a lot
gulp.task('bootstrap', function() {
  //gulp.src('bower_components/bootstrap/dist/fonts/*').pipe(gulp.dest('www/fonts'));
  gulp.src('www/less/bootstrap.less').pipe(less()).pipe(gulp.dest('bower_components/bootstrap/dist/css'));
});

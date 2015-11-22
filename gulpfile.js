var gulp = require('gulp');
var livereload = require('gulp-livereload');
var webpack = require('webpack-stream')
var staticHash = require('gulp-static-hash');
var uglify = require('gulp-uglify');
var cordova = require('cordova');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var less = require('gulp-less');
var shell = require('gulp-shell');
var run = require('gulp-run');

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
  gulp.watch(['./www/js/**/*.jsx', './www/css/*.css', './www/less/*.less'], ['livereload']);
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
gulp.task('less', function() {
  //gulp.src('bower_components/bootstrap/dist/fonts/*').pipe(gulp.dest('www/fonts'));
  gulp.src('www/less/dropdown.less').pipe(less()).pipe(gulp.dest('www/css'));
});

gulp.task('deploy', function(){
  var argv = require('yargs').argv;
  var cmd;
  if (argv.target == 'android'){
    cmd = 'cordova run android --device';
  }else if (argv.target == 'android-emulator'){
    cmd = 'cordova run android --target="tab"';
  }else if (argv.target == 'ios'){
    cmd = 'cordova run ios --device"';
  }else if (argv.target == 'ios-emulator'){
    cmd = 'cordova run ios --target="iPad-2"';
  }else if (argv.target == 'windows'){
    cmd = 'cordova run windows --appx=uap'
  }else{
    console.log("'gulp deploy --target=android | android-emulator | ios | ios-emulator | windows");
    return;
  }
  console.log(cmd);
  run(cmd).exec();
});

gulp.task('plugin', shell.task([
  'cordova plugin remove cordova-plugin-file',
  'cordova plugin add https://github.com/apache/cordova-plugin-file.git'
]));

gulp.task('icon', shell.task([
  'cordova-icon'
]));

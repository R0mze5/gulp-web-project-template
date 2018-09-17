'use strict';
var argv = require('yargs').argv;
/*----------------------------------------------------------*/
/*-********************************************************-*/
/*-                                                        -*/
/*-    input folder project name into "project" variable   -*/
/*-                                                        -*/
/*-********************************************************-*/
/*----------------------------------------------------------*/
let typeProject = argv.folder ? argv.folder :'projects'; // folder with projects
let project = argv.project ? argv.project :'!template';


/*-********************************************************-*/
/*-                       require                          -*/
/*-********************************************************-*/

const gulp = require('gulp');

// ----------   bower   ----------
/*const mainBowerFiles = require('main-bower-files');*/

// ----------   operations with files   ----------
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const path = require('path');
const del = require('del');
const gulpif = require('gulp-if');

const browserSync = require('browser-sync'); /*(install global)*/
const gutil = require( 'gulp-util' );  
const ftp = require( 'vinyl-ftp' );
const sftp = require('gulp-sftp');


// ----------   operations with styles   ----------
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');


// ----------   operations with scripts   ----------
const babel = require('gulp-babel');
/*const eslint = require('gulp-eslint');*/
let uglify = require('gulp-uglify-es').default;


// ----------   operations with pagess   ----------
const pug = require('gulp-pug');

// ----------   operations with images   ----------
/* const image = require('gulp-image'); */
const imagemin = require('gulp-imagemin');

/*-********************************************************-*/
/*-                    ./require                           -*/
/*-********************************************************-*/



/*-********************************************************-*/
/*-                     configurate                        -*/
/*-********************************************************-*/
typeProject = typeProject ? typeProject : 'projects'
const projectsFolder = '../' + typeProject + '/' + project;

global.variables = {};

console.log(projectsFolder)
try{
	require(projectsFolder + '/gulpConfig.js');
} 
catch(err){
	console.error('not such project folder');
	return false;
}

const user = global.variables.user || 'user';  
const password = global.variables.password || 'password';  
const host = global.variables.host || '127.0.0.1';  
const port = global.variables.port || 21;  //default is 21
const localFilesGlob = global.variables.localFilesGlob || [ '**/*', '!_psd/**/*', '!libs/**/*', '!node_modules/**/*', 'site.gulp_configuration.js']; 
const remoteFolder = global.variables.remoteFolder || '/path/to/folder';
const protocol = global.variables.protocol || 'sftp'; //ftp or sttp
const preprocessor = global.variables.preprocessor || 'less';
const sourcePath = global.variables.sourcePath || '/';


let isDev = false;
let isWatching = false;

const projectPath = projectsFolder + '/';
let destPath = projectPath;
let destSourcePath = projectsFolder + sourcePath;
let fontsPath;



// helper function to build an FTP connection based on our configuration
/* function getFtpConnection() {  
	return ftp.create({
		host: host,
		port: port,
		user: user,
		password: password,
		parallel: 5,
		log: gutil.log
	});
}
function getSftpConnection() {  
	return sftp({
		host: host,
		port: port,
		user: user,
		password: password,
		remotePath: remoteFolder
	});
} */


/*-********************************************************-*/
/*-                     ./configurate                      -*/
/*-********************************************************-*/


gulp.task('default', ['watch']);


/*---------------------------------------------------------------------------*
 * sync
 *---------------------------------------------------------------------------*/



gulp.task('browser-sync', function() {
	isWatching = true;
	browserSync({
		server:{
			baseDir: destPath
		},
		notify: false
	});
});


gulp.task('pathToDev', function() {
	destPath += 'dev/';
	destSourcePath = projectsFolder + '/dev' + sourcePath;
	isDev = true;
});



gulp.task('watch', ['build:dev', 'browser-sync'], function() {
	gulp.watch(projectPath + 'src/'+ preprocessor +'/**/*.less', ['css']);
	gulp.watch(projectPath + 'src/'+ preprocessor +'/**/*.scss', ['css']);
	gulp.watch(projectPath + 'src/es/**/*.js', ['es']);
	gulp.watch(projectPath + 'src/pug/**/*.pug', ['pug']);
	gulp.watch(projectPath + 'src/images/**/*.*', ['images']);
	gulp.watch(projectPath + 'src/documents/**/*.*', ['documents']);

	gulp.watch(destSourcePath +'js/**/*.js', browserSync.reload);
	gulp.watch(destSourcePath +'images/**/*.*', browserSync.reload);
	gulp.watch(projectPath + '**/*.html', browserSync.reload);
	gulp.watch(projectPath + '**/*.php', browserSync.reload);
});



gulp.task('build:dev', ['pathToDev', 'pug', 'css', 'es', 'fonts', 'images', 'documents']);
gulp.task('build:dev:clean', ['pathToDev', 'pug', 'css', 'es', 'fonts', 'images', 'documents']);

gulp.task('build:dist', ['fonts', 'css', 'es']);
gulp.task('build:dist:project', ['pug', 'buildpugbase', 'buildpugareas', 'buildpugmetrix', 'css', 'es', 'fonts', 'images', 'documents']);

/* gulp.task('clean', ()=>{
	sourcePath+'css/*.css',
	sourcePath+'js/*.js'
}); */



/* gulp.task('deploy', ['images'], function() {
	if (protocol === 'ftp') {
		return gulp.src(localFilesGlob, { base: '.', buffer: false })
			.pipe(getFtpConnection().dest( remoteFolder ));
	} else if  (protocol === 'sftp') {
		return gulp.src(localFilesGlob)
			.pipe(getSftpConnection());
	} else {
		console.log('Protocol is incorrect or undefined. Please declare a variable protocol with \'ftp\' or \'sftp\' value ');
	}
}); */


/*---------------------------------------------------------------------------*
 * ./sync
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * fonts
 *---------------------------------------------------------------------------*/

gulp.task('fonts', function() {
	fontsPath = global.variables.sourcePath == '/' ? projectPath + 'src/fonts/**/*-light.css' : projectPath + 'src/fonts/**/*-bitrix.css';
	return gulp
		.src(['!' + projectPath + 'src/fonts/**/*.css', '!' + projectPath + 'src/fonts/**/*.html', projectPath + 'src/fonts/**/*.*'])
		.pipe(gulp.dest(destSourcePath + 'fonts'));
});

/*---------------------------------------------------------------------------*
 * ./fonts
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * styles
 *---------------------------------------------------------------------------*/

gulp.task('less', function() {
	return gulp
		.src(projectPath + 'src/less/*.less')
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(less()).on('error', gutil.log)
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 11'], {cascade: true}))
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulpif(!isDev, cssnano({reduceIdents: false})))
		.pipe(gulp.dest(destSourcePath + 'css'))
		/* .pipe(rename({
			suffix: '.min'
		})) */
		.pipe(gulpif(isWatching, browserSync.reload({stream: true})))
});


gulp.task('css',['less'], function() {
	return gulp
		.src([ './../libs/normalize.css/normalize.css', projectPath + 'src/**/vendors/*.css', fontsPath, destSourcePath + 'css/main.css' ])
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(concat('common.css'))
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulpif(!isDev, cssnano({reduceIdents: false})))
		.pipe(gulp.dest(destSourcePath + 'css'))
		/* .pipe(rename({suffix: '.min'}))  */
});

/*---------------------------------------------------------------------------*
 * ./styles
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * js
 *---------------------------------------------------------------------------*/

gulp.task('es',  function() {
	return gulp
		.src(projectPath + 'src/es/**/*.js')
		.pipe(gulpif(isDev, sourcemaps.init()))
		/* .pipe(babel({})) */
		/*.pipe(eslint())   
		.pipe(eslint.format())*/
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulpif(!isDev, uglify()))
		.pipe(gulp.dest(destSourcePath + 'js'))
		/* .pipe(rename({ suffix: '.min' })) */
});

/*---------------------------------------------------------------------------*
 * ./js
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * pages
 *---------------------------------------------------------------------------*/

gulp.task('pug',  function() {
	return gulp
		.src([projectPath + 'src/pug/**/*.pug', '!' + projectPath + 'src/pug/base_areas/*.pug', '!' + projectPath + 'src/pug/components/*.pug', '!' + projectPath + 'src/pug/contacts/*.pug', '!' + projectPath + 'src/pug/include_areas/*.pug', '!' + projectPath + 'src/pug/metrix/*.pug', '!' + projectPath + 'src/pug/sections/*.pug'])
		.pipe(pug({
			pretty: true
		}))
		.pipe(rename(function(file) {
			if(file.basename !== 'index'){
				/* if (file.dirname == '.'){ */
					file.dirname = path.join(file.dirname, file.basename);
					file.basename = 'index';
					file.extname = '.html';
				/* } */
			}
		  }))
		.pipe(gulp.dest(destPath))
});

gulp.task('buildpugbase',  function() {
	return gulp
		.src(projectPath + 'src/pug/base_areas/*.pug')
		.pipe(pug({
			pretty: true
		}))

		.pipe(rename(function(file) {
			file.extname = '.php';
		  }))
		.pipe(gulp.dest(destSourcePath + 'base_areas'))
});

gulp.task('buildpugareas',  function() {
	return gulp
		.src(projectPath + 'src/pug/include_areas/*.pug')
		.pipe(pug({
			pretty: true
		}))

		.pipe(rename(function(file) {
			file.extname = '.php';
		  }))
		.pipe(gulp.dest(destSourcePath + 'include_areas'))
});

gulp.task('buildpugmetrix',  function() {
	return gulp
		.src(projectPath + 'src/pug/metrix/*.pug')
		.pipe(pug({
			pretty: true
		}))

		.pipe(rename(function(file) {
			file.extname = '.php';
		  }))
		.pipe(gulp.dest(destSourcePath + 'metrix'))
});

/*---------------------------------------------------------------------------*
 * ./pages
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * images
 *---------------------------------------------------------------------------*/
 
gulp.task('images', function () {
	return gulp
		.src([projectPath + 'src/images/**/*.*'])
		.pipe(gulpif(!isDev, imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		])))
		.pipe(gulp.dest(destSourcePath + 'images'));
});

/*---------------------------------------------------------------------------*
 * ./images
 *---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*
 * documents
 *---------------------------------------------------------------------------*/
 
gulp.task('documents', function () {
	return gulp
		.src([projectPath + 'src/documents/**/*.*'])
		.pipe(gulp.dest(destSourcePath + 'documents'));
});
 
/*---------------------------------------------------------------------------*
 * ./documents
 *---------------------------------------------------------------------------*/
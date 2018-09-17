'use strict';
var argv = require('yargs').argv;

/*----------------------------------------------------------*/
/*-********************************************************-*/
/*-                                                        -*/
/*-    input folder project name into "project" variable   -*/
/*-                                                        -*/
/*-********************************************************-*/
/*----------------------------------------------------------*/
let typeProject = 'projects'; // folder with projects
let project = argv.project ? argv.project :'cognition.web';


/*-********************************************************-*/
/*-                       require                          -*/
/*-********************************************************-*/

const gulp = require('gulp');

// ----------   bower   ----------
/*const mainBowerFiles = require('main-bower-files');*/

// ----------   operations with files   ----------
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');

const browserSync = require('browser-sync'); /*(install global)*/
const gutil = require( 'gulp-util' );  
const ftp = require( 'vinyl-ftp' );
const sftp = require('gulp-sftp');


// ----------   operations with styles   ----------
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
//const sourcemaps = require('gulp-sourcemaps');


// ----------   operations with scripts   ----------
const babel = require('gulp-babel');
/*const eslint = require('gulp-eslint');*/
let uglify = require('gulp-uglify-es').default;


// ----------   operations with images   ----------
const image = require('gulp-image');

/*-********************************************************-*/
/*-                    ./require                           -*/
/*-********************************************************-*/



/*-********************************************************-*/
/*-                     configurate                        -*/
/*-********************************************************-*/
const projectsFolder = typeProject ? typeProject : 'projects';

global.variables = {};
try{require('../'+projectsFolder+'/'+project+'/site.gulp_configuration.js');} catch(err){console.error('not such project folder');}

const user = global.variables.user || 'user';  
const password = global.variables.password || 'password';  
const host = global.variables.host || '121.121.231.231';  
const port = global.variables.port || 21;  //default is 21
const localFilesGlob = global.variables.localFilesGlob || [ '**/*', '!_psd/**/*', '!libs/**/*', '!node_modules/**/*', 'site.gulp_configuration.js']; 
const remoteFolder = global.variables.remoteFolder || '/path/to/folder';
const protocol = global.variables.protocol || 'sftp'; //ftp or sttp
const preprocessor = global.variables.preprocessor || 'less';


const projectPath = '../'+projectsFolder+'/'+ project + '/';
const sourcePath = '../'+projectsFolder+'/'+ project + global.variables.sourcePath;
const fontsPath = global.variables.sourcePath == '/' ? sourcePath + 'fonts/**/*-light.css' : sourcePath + 'fonts/**/*-bitrix.css';



// helper function to build an FTP connection based on our configuration
function getFtpConnection() {  
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
}


/*-********************************************************-*/
/*-                     ./configurate                      -*/
/*-********************************************************-*/


gulp.task('default', ['watch']);


/*---------------------------------------------------------------------------*
 * sync
 *---------------------------------------------------------------------------*/



gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir: projectPath
		},
		/*proxi: "http://website.ru",*/
		notify: false
	});
});



gulp.task('watch', ['css', 'es6', 'browser-sync'], function() {
	gulp.watch(projectPath + 'src/'+ preprocessor +'/**/*.less', ['css']);
	gulp.watch(projectPath + 'src/'+ preprocessor +'/**/*.scss', ['css']);

	gulp.watch(sourcePath+'es6/**/*.js', browserSync.reload);
	gulp.watch(sourcePath+'js/**/*.js', browserSync.reload);
	gulp.watch(projectPath + '**/*.html', browserSync.reload);
	gulp.watch(projectPath + '**/*.php', browserSync.reload);
	gulp.watch(projectPath + '**/*.pug', browserSync.reload);
});



gulp.task('build', ['css', 'es6', 'images']);
gulp.task('crean', ()=>{
	sourcePath+'css/*.css',
	sourcePath+'js/*.js'
});



gulp.task('deploy', ['images'], function() {
	if (protocol === 'ftp') {
		return gulp.src(localFilesGlob, { base: '.', buffer: false })
			.pipe(getFtpConnection().dest( remoteFolder ));
	} else if  (protocol === 'sftp') {
		return gulp.src(localFilesGlob)
			.pipe(getSftpConnection());
	} else {
		console.log('Protocol is incorrect or undefined. Please declare a variable protocol with \'ftp\' or \'sftp\' value ');
	}
});


/*---------------------------------------------------------------------------*
 * ./sync
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * styles
 *---------------------------------------------------------------------------*/

gulp.task('less', function() {
	return gulp
		.src(projectPath + 'src/less/*.less')
		//.pipe(sourcemaps.init())
		.pipe(less()).on('error', gutil.log)
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 11'], {cascade: true}))
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest(sourcePath+'css'))
		.pipe(cssnano({
			reduceIdents: false
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(sourcePath+'css'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('css',['less'], function() {
	return gulp
		.src([ './../libs/normalize.css/normalize.css', sourcePath+'css/vendors/*.css', fontsPath, sourcePath+'css/main.css' ])
		//.pipe(sourcemaps.init())
		.pipe(concat('common.css'))
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest(sourcePath+'css'))
		.pipe(cssnano({
			reduceIdents: false
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(sourcePath+'css'));
});

/*---------------------------------------------------------------------------*
 * ./styles
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * js
 *---------------------------------------------------------------------------*/

gulp.task('es6',  function() {
	return gulp
		.src(projectPath + 'src/es6/*.js')
		.pipe(babel({}))
		/*.pipe(eslint())   
		.pipe(eslint.format())*/
		.pipe(gulp.dest(sourcePath+'js'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		})) 
		.pipe(gulp.dest(sourcePath+'js'));
    
});

/*---------------------------------------------------------------------------*
 * ./js
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * images
 *---------------------------------------------------------------------------*/
 
gulp.task('images', function () {
	return gulp
		.src([sourcePath+'images/**/*.*'])
		.pipe(image())
		.pipe(gulp.dest(sourcePath+'images'));
});

/*---------------------------------------------------------------------------*
 * ./images
 *---------------------------------------------------------------------------*/

'use strict';
var argv = require('yargs').argv; /*(install global)*/
/*----------------------------------------------------------*/
/*-********************************************************-*/
/*-                                                        -*/
/*-    input folder project name into "project" variable   -*/
/*-                                                        -*/
/*-********************************************************-*/
/*----------------------------------------------------------*/
let typeProject = argv.folder ? argv.folder :'projects'; // folder with projects
let project = argv.project ? argv.project :'project.example';


/*-********************************************************-*/
/*-                       require                          -*/
/*-********************************************************-*/

const gulp = require('gulp'); /*(install global)*/
const browserSync = require('browser-sync'); /*(install global)*/
const gulpSequence = require('gulp-sequence') // allow run task after end previous task
const debug = require('gulp-debug');
const streamfilter = require('streamfilter');
const plumber = require('gulp-plumber'); // error control
const path = require('path');
const gulpif = require('gulp-if');
const del = require('del');

// ----------   operations with files   ----------
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const gap = require('gulp-append-prepend'); // insert file into other

const gutil = require( 'gulp-util');  
// const ftp = require( 'vinyl-ftp' );
// const sftp = require('gulp-sftp');


// ----------   operations with styles   ----------
const less = require('gulp-less');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');


// ----------   operations with scripts   ----------
/* const babel = require('gulp-babel'); */
/*const eslint = require('gulp-eslint');*/
let uglify = require('gulp-uglify-es').default;


// ----------   operations with pagess   ----------
const pug = require('gulp-pug');
const replace = require('gulp-replace');

// ----------   operations with images   ----------
const imagemin = require('gulp-imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

/*-********************************************************-*/
/*-                    ./require                           -*/
/*-********************************************************-*/



/*-********************************************************-*/
/*-                     configurate                        -*/
/*-********************************************************-*/
// typeProject = typeProject ? typeProject : 'projects'
const projectsFolder = '../' + typeProject + '/' + project;

global.variables = {};

try{
	require(projectsFolder + '/gulpConfig.js');
} 
catch(err){
	console.error('not such project folder');
	return false;
}

// const user = global.variables.user || 'user';  
// const password = global.variables.password || 'password';  
// const host = global.variables.host || '127.0.0.1';  
// const port = global.variables.port || 21;  //default is 21
// const localFilesGlob = global.variables.localFilesGlob || [ '**/*', '!_psd/**/*', '!libs/**/*', '!node_modules/**/*', 'site.gulp_configuration.js']; 
// const remoteFolder = global.variables.remoteFolder || '/path/to/folder';
// const protocol = global.variables.protocol || 'sftp'; //ftp or sttp
const preprocessor = global.variables.preprocessor || 'less'; 
const sourcePath = global.variables.sourcePath || '/';  // path to styles, scripts, images, etc
const distExtension = global.variables.distExtension || 'php'; // output pages files extension
const distType = global.variables.distType || ''; // if 'bitrix' change includes in .pup on require in php
const isDevFolder = global.variables.isDevFolder || true; 


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







if(isDevFolder){

	gulp.task('dev', gulpSequence('pathToDev', 'clean', ['html', 'pug', 'fonts'], 'vendors', ['css', 'es', 'images', 'videos', 'documents'], 'browser-sync', 'watch'));

	gulp.task('dev:clean', gulpSequence('pathToDev', 'clean'));
	
	gulp.task('dev:build', gulpSequence('pathToDev', 'clean', ['html', 'pug', 'fonts'], 'vendors', 'css', 'es', 'images', 'documents', 'videos'));

	gulp.task('dev:build:pages', ['pathToDev', 'html', 'pug']);
	
	gulp.task('dev:build:css', gulpSequence('pathToDev', 'fonts', 'vendors', 'css'));
	
	gulp.task('dev:build:es', ['pathToDev', 'es']);
	
	gulp.task('dev:build:images', ['pathToDev', 'images']);
	
	
	
	gulp.task('compile', gulpSequence('dev:build', 'pathToDist', 'dist:build'));

	gulp.task('compile:build', gulpSequence('dev:build', 'pathToDist', 'dist:build:clean'));

	gulp.task('compile:clean', gulpSequence('dev:clean', 'pathToDist', 'dist:clean'));

	gulp.task('compile:build:clean', gulpSequence('compile:clean', 'compile:build'));

	gulp.task('compile:pages', gulpSequence('dev:build:pages', 'pathToDist', 'dist:build:pages'));

	gulp.task('compile:css', gulpSequence('dev:build:css', 'pathToDist', 'dist:build:css'));

	gulp.task('compile:es', gulpSequence('dev:build:es', 'pathToDist', 'dist:build:es'));

	gulp.task('compile:images', gulpSequence('dev:build:images', 'pathToDist', 'dist:build:images'));

}


gulp.task('dist', gulpSequence('clean', ['html', 'pug', 'fonts'], 'vendors', ['css', 'es', 'images', 'documents'], 'browser-sync', 'watch'));

gulp.task('dist:clean', gulpSequence('clean'));

gulp.task('dist:build', gulpSequence('fonts', 'vendors', ['css', 'es', 'images', 'documents']));

gulp.task('dist:build:clean', gulpSequence('clean', ['html', 'pug', 'fonts'], 'vendors', ['css', 'es', 'images', 'documents']));

gulp.task('dist:build:pages', gulpSequence(['html', 'pug']));

gulp.task('dist:build:css', gulpSequence('fonts', 'vendors', 'css'));

gulp.task('dist:build:es', gulpSequence('es'));

gulp.task('dist:build:images', gulpSequence('images'));


let defaultTask = isDevFolder ? 'dev' : 'dist';

gulp.task('default', [defaultTask]);



/*---------------------------------------------------------------------------*
 * services
 *---------------------------------------------------------------------------*/


gulp.task('pathToDev', function() {
	return new Promise(resolve => {		
		if (isDevFolder){
			destPath += 'dev/';
			destSourcePath = projectsFolder + '/dev' + sourcePath;
			isDev = true;
			resolve();
		}
	})
});

gulp.task('pathToDist', function() {
	return new Promise(resolve => {	
		destPath = projectPath;
		destSourcePath = projectsFolder + sourcePath;
		isDev = false;
		resolve();
	})
});



gulp.task('browser-sync', function() {
	isWatching = true;
	browserSync({
		server:{
			baseDir: destPath
		},
		notify: false
	});
});


gulp.task('watch', function() {
	gulp.watch(projectPath + 'src/'+ preprocessor +'/**/*.less', ['css']);
	gulp.watch(projectPath + 'src/'+ preprocessor +'/**/*.scss', ['css']);
	gulp.watch(projectPath + 'src/es/**/*.js', ['es']);
	gulp.watch(projectPath + 'src/pug/**/*.pug', ['pug']);
	gulp.watch(projectPath + 'src/**/*.html', ['html']);
	gulp.watch(projectPath + 'src/images/**/*.*', ['images']);
	gulp.watch(projectPath + 'src/documents/**/*.*', ['documents']);
	gulp.watch(projectPath + 'videos/**/*.*', ['videos']);
	gulp.watch(projectPath + 'src/fonts/**/*.*', ['fonts']);

	gulp.watch(destSourcePath +'js/**/*.js', browserSync.reload);
	gulp.watch(destSourcePath +'css/**/*.css', browserSync.reload);
	gulp.watch(destSourcePath +'images/**/*.*', browserSync.reload);
	gulp.watch(destPath + 'videos/**/*.*', browserSync.reload);
	gulp.watch(destPath + '**/*.html', browserSync.reload);
	gulp.watch(destPath + '**/*.php', browserSync.reload);
});


gulp.task('clean', function() {
	return new Promise(resolve => {
		if(isDev && isDevFolder) {
			del([destPath], {force: true}).then(() => {resolve()});
		} else if(((isDev && !isDevFolder) || !isDev) && sourcePath != '/'){
			del([projectsFolder + '/' + sourcePath.split('/')[1]], {force: true}).then(() => {resolve()});
		}
	})
});

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
 * ./services
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * styles
 *---------------------------------------------------------------------------*/


gulp.task('fonts', function() {
	fontsPath = global.variables.sourcePath == '/' ? projectPath + 'src/fonts/**/*-light.css' : projectPath + 'src/fonts/**/*-bitrix.css';
	return gulp
		.src([projectPath + 'src/fonts/**/*.eot', projectPath + 'src/fonts/**/*.svg', projectPath + 'src/fonts/**/*.ttf', projectPath + 'src/fonts/**/*.woff', projectPath + 'src/fonts/**/*.woff2'])
		//.pipe(plumber())
		.pipe(gulp.dest(destSourcePath + 'fonts'));
});

 gulp.task('vendors', function() {
	return gulp
		.src([projectPath + 'src/**/vendors/*.css', fontsPath])
		.pipe(concat('vendors.css'))
		.pipe(gulp.dest(destSourcePath + 'css'))
});

gulp.task('css', function() {
	return gulp
		.src(projectPath + 'src/' + preprocessor + '/*.' + preprocessor)
		.pipe(gulpif((isDev && isDevFolder), sourcemaps.init()))
		//.pipe(plumber())
		.pipe(gulpif(preprocessor == 'less', less().on('error', gutil.log)))
		.pipe(gulpif(preprocessor == 'sass', sass().on('error', sass.logError)))
		.pipe(gulpif(/main/, gap.prependFile(destSourcePath + 'css/vendors.css')))
		.pipe(autoprefixer(['last 15 versions', '> 1%'], {cascade: true}))
		.pipe(gulpif((isDev && isDevFolder), sourcemaps.write()))
		.pipe(gulpif((!isDev && isDevFolder), cssnano({reduceIdents: false})))
		.pipe(gulp.dest(destSourcePath + 'css'))
		.pipe(gulpif((!isDev && !isDevFolder), cssnano({reduceIdents: false})))
		.pipe(gulpif((!isDev && !isDevFolder), rename({suffix: '.min'})))
		.pipe(gulpif((!isDev && !isDevFolder), gulp.dest(destSourcePath + 'css')))
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
		.pipe(gulpif((isDev && isDevFolder), sourcemaps.init()))
		.pipe(plumber())
		/* .pipe(babel({})) */
		/*.pipe(eslint())   
		.pipe(eslint.format())*/
		.pipe(gulpif((isDev && isDevFolder), sourcemaps.write()))
		.pipe(gulpif((!isDev && isDevFolder), uglify()))
		.pipe(gulp.dest(destSourcePath + 'js'))
		.pipe(gulpif((!isDev && !isDevFolder), uglify()))
		.pipe(gulpif((!isDev && !isDevFolder), rename({suffix: '.min'})))
		.pipe(gulpif((!isDev && !isDevFolder), gulp.dest(destSourcePath + 'css')))
});



/*---------------------------------------------------------------------------*
 * ./js
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * pages
 *---------------------------------------------------------------------------*/


gulp.task('html', function () {
	return gulp
		.src(['!' + projectPath + 'src/fonts/**/*.html', projectPath + 'src/**/*.html'])
		//.pipe(plumber())
		.pipe(gulp.dest(destPath))
});


let includeRegExp = /include.+\.pug/g;
function regExpFilter(str) {
    let output 
	let header = `<? \
	require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php"); \
	$APPLICATION->SetPageProperty("title", "Главная"); \
	$APPLICATION->SetTitle("Главная страница"); \
	?>
	`
    let footer = `<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>`;
    if (str.search(/base_areas\/header.pug/ig) != -1){
        output = header;
    } else if (str.search(/base_areas\/footer.pug/ig) != -1){
        output = footer;
    } else {
        let clearStr = str.split(' ')[1].replace(/\.pug/, '').replace(/\.\.\//, '')
        output = '| <?require($_SERVER["DOCUMENT_ROOT"]."'+ sourcePath +  clearStr + '.php");?>';
    }
    return output;
}


let filterFolder = ['base_areas', 'components', 'elements', 'contacts', 'include_areas', 'metrix', 'sections'];

function filterPath(filterFolder) {
	return streamfilter((file, enc, cb) => {
		cb(filterFolder.some(filterPath => (file.path.indexOf('\\' + filterPath + '\\') != -1)))
	}, {
		objectMode: true,
	})
}

function renameFile(file){
	let ext = isDev ? 'html' : distExtension;
	if((file.basename == 'index' || file.basename == '404') && file.dirname == '.'){} else {
		if(filterFolder.some(filterPath => (file.dirname.indexOf(filterPath) != -1))){
			if (file.dirname.indexOf('base_areas') != -1){
				file.dirname = sourcePath;
			} else {
				file.dirname = path.join(sourcePath, file.dirname);
			}
		} else {
			file.dirname = path.join(file.dirname, file.basename);
			file.basename = 'index';
		}
	}
	
	file.extname = '.' + ext;
}

let pugSrc = [projectPath + 'src/pug/**/*.pug', '!' + projectPath + 'src/pug/**/!template.pug'];

gulp.task('pug',  function() {
	return gulp
		.src(pugSrc)
		.pipe(gulpif(isDev || (!isDev && distType != 'bitrix'), filterPath(filterFolder)))
		//.pipe(plumber())

		.pipe(gulpif((!isDev && distExtension == 'php' && distType == 'bitrix'), replace(includeRegExp, regExpFilter)))

		.pipe(pug({
			pretty: true
		}))
		
		.pipe(rename(function(file){
			renameFile(file)
		}))
		.pipe(gulp.dest(destPath))
});

/*---------------------------------------------------------------------------*
 * ./pages
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * files
 *---------------------------------------------------------------------------*/
 
gulp.task('images', function () {
	return gulp
		.src([projectPath + 'src/images/**/*.*'])
		.pipe(debug({title: 'building img:', showFiles: true}))
      	.pipe(plumber())
      	.pipe(gulp.dest(destSourcePath + 'images'))
      	.pipe(gulpif(!isDev, imagemin([
			imageminGifsicle({interlaced: true}),
			imageminJpegRecompress({
				progressive: true,
				max: 80,
				min: 70
			}),
			imageminPngquant({quality: '80'}),
			imageminSvgo({plugins: [{removeViewBox: true}]})
		])))
		.pipe(gulpif(!isDev, gulp.dest(destSourcePath + 'images')));
});
 
gulp.task('videos', function () {
	return gulp
		.src([projectPath + 'videos/**/*.*'])
		.pipe(gulp.dest(destPath))
});
 
gulp.task('documents', function () {
	return gulp
		.src([projectPath + 'src/documents/**/*.*'])
		.pipe(gulp.dest(destSourcePath + 'documents'));
});
 
/*---------------------------------------------------------------------------*
 * ./files
 *---------------------------------------------------------------------------*/
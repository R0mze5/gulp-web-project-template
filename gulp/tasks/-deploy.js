'use strict';

let path = $.path;


let returnFunc = (cb) => {
  // return $.gulp
  //   .src(path.src.pages)
  //   .pipe(path.dest.pages);
  //   cb();
};

module.exports = ['deploy', returnFunc];

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
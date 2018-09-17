'use strict';

const mainPath = '/';
const bitrixPath = '/local/templates/website/';

global.variables = {
	sourcePath: bitrixPath,
	preprocessor: 'less',
	host:'host',
	port: 21,//default is 21,
	protocol:'ftp',//ftp or sttp
	user:'user',
	password:'password',
	remoteFolder:'/public_html',
	localFilesGlob:[ '**/*', '!_psd/**/*', '!libs/**/*', '!node_modules/**/*', '!site.gulp_configuration.js', 'gulpConfig.js']
};

# web-project-template

web-project-template - is the free task manager for web projects, based on gulp. Used just one `node_modules` folder for all projects


_Read documentation in other languages:_\
[_Документация на русском_](./assets/documentation/RU-ru/README.md)

## Install gulp

Open `gulp` forder in terminal and enter the commands\
`sudo yarn add gulp -g` \
`sudo yarn add browser-sync -g` \
`sudo yarn install`

## Stucture of initial projects

``` html
-- gulp
 |- projects

    |-projectName1
        |- .gitignore
        |- assets
        |- src
            |- documents
            |- es
                | vendors -> *.js
                | *.js
            |- fonts
            |- images
            |- {less, sass}
                | vendors -> *.css
                | {*.less, *.sass}
            |- pug -> *.pug
            |- *.html
        |- gulpConfig.js
        |- package.json
        |- videos

    |-projectName2
```

- `gulp` - folder with `gulpfile.js` and `node_modules` folder;
- `projects` - folder includes folder with all projects using gulpfile form `gulp` project (key for **change** `projects` to other foler -  '`--folder=anyOtherFolderYouWant`'. Example see next);
- `projectName1`, `projectName2` - folder with websites (key for **use** `projects` to other foler -  '`--project=youProjectName`'. Example see next);
- `assets` - folder with psd files and others, which don't uploaded on git repository;
- `src` - source (not compilled and not minified) files;
- `documents` - folder with document like agreements and etc;
- `es` - folder with *.js files;
- `fonts` - folder with font files and css files for them. (if sourcePath in [**gulpConfig.js**](gulp/documentation/gulpConfig.md) is `'/'`, name of css file with @font-face must contains '`-light.css'` (for exalmpe: `'Roboto-light.css'`), else name must contains `'-bitrix.css'`). For example watch `/projects/project.example/src/fonts/Roboto`;
- `less` - folder with *.less files;
- `sass` - folder with *.sass files;
- `vendors` - folder with vendor files like scripts and styles
- `pug` - folder with *.pug files (for compilation in bitrix files watch [**gulpConfig.js**](gulp/documentation/gulpConfig.md) paragraph `distType`);
- `.*html` - html files of you project if you don't use pug;
- `gulpConfig.js` - configuration file of you project for gulp ([description and example](gulp/documentation/gulpConfig.md));
- `package.json` - configuration file of you project. Keep you scripts for gulp.  (example see next);
- `videos` - folder for video files. Just using by gulp work if you have `devFolder`;

## configure gulpConfig.js

[**description of gulpConfig.js**](gulp/documentation/gulpConfig.md)

example of gulpConfig.js

``` js
    global.variables = {
        isDevFolder: true,
        sourcePath: '/local/templates/website/',
        preprocessor: 'less',
        distExtension: 'php',
        distType: 'bitrix'
    };
```

## use gulp by `package.json` scripts or with `terminal commands`

command to run gulp task contains:
- `gulp` word
- name of gulp task. list of [gulp tasks names](gulp/documentation/gulpTasks.md)
- key `--project=youProjectName` with name of project. 
- key [optional] `--folder=newFolderWithProjects` to change path to project from `'/projects'` to `'/newFolderWithProjects'` 

### in terminal use in gulpFolder you must enter:

- for use command from terminal, change directory to `/gulp` folder
- enter the command

for example run watch task for project.example folder

```js
    gulp dev --project=project.example
```

### in package.json file:

- in scripts in package.json add field (with name for exaple `'dev'`) with value consist of `--cwd`, `path to gulp` relative package.json file and `command` \

> example of package.json 
>```json
>{
>    "scripts": {
>        "dev": "gulp dev --cwd ../../gulp/ --folder=projects --project=project.example"
>    }
>}
>
>```

- open the terminal, change directory to package.json folder and enter the command

> ```js
>     npm run dev
> ```

example of all avaliable commands you can see in `/projects/project.example/package.json`

## Changelog

Changelog is available on [Changelog documentation](gulp/documentation/changelog.md).


## License

 web-project-template is licensed [WTFPL](http://www.wtfpl.net/about/). You can use it **for free** and **without any attribution**, in any personal or commercial project. You may also fork the project and re-release it under another license you prefer.

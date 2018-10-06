# gulpTasks

All commands consists from same words separated by ':'

There is 3 types of commands:

- `dev` - compiling files from src to dev folder
- `dist` - compiling and compressed files from src to dist folder and *.html/*.php to root folder (`'/'`)
- `compile` - compiling ( and compressed for dist folder) files from src to dev and dist folders

tasks for `dev` and `compile` avaliable only, when `isDevFolder` in [**gulpConfig.js**](gulpConfig.md) has value `true`;

> in `'{}'` command avaliable for all of types of command. For examle: \
> `{dev, dist, compile}:build` means, that there is `dev:build`, `dist:build`, `compile:build` commands

## list of commands

- `{dev, dist}` - tasks, which clean `sourcePath` folder, compilling (and compressed for dist) all files from src folder, run browser with live reload, control changings in src folder and run some tasks when it needs.

- `{dev, dist, compile}:clean` - tasks, which clean `sourcePath` folder (`'/dev'` folder for dev)

- `{dev, dist, compile}:build` - tasks, which copy/compile all files from  `/src` folder (for `dist` folder for `dist` and `compile` *.htm/*.pug files don't compiled because often you need compiled all files for distribution but don't need change page files)

- `{dev, dist, compile}:build:clean` - tasks, which make `{dev, dist, compile}:clean` and after that `{dev, dist, compile}:build`;

- `{dev, dist, compile}:build:pages` - tasks, which compile *.php/*.html files from  *.pug/*.html. Extension and composition of files depends on which `'distExtension'` and `'distType'` used in [**gulpConfig.js**](gulpConfig.md)

- `{dev, dist, compile}:build:css` - tasks, which concatenate font styles from `'/src/fonts'` folder with all files in `'/src/{less, sass}/vendors'` (less or sass depends on which prepocessor used in [**gulpConfig.js**](gulpConfig.md) in `'preprocessor'` field) and inject it in `'main.css'` file. Also it compiled *.less/*.sass files to *.css

- `{dev, dist, compile}:build:es` - tasks, which copy (and compressed for dist and compile) *.js files `'/src/es'` to `sourcePath/js`

- `{dev, dist, compile}:build:images` - tasks, which copy (and compressed for dist and compile) images from `'/src/images'` to `sourcePath/images`
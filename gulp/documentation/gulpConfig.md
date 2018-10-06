# gulpConfig.js

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

> **`isDevFolder`** \
> create `/dev/` folder with uncompressed file for develop mode, which nessesary when you don't want change distribution files, while you develop website and control it. If `true`, `dev:` and `compile:` are avaliable \
> **variants**  `true`, `false`\
> **default**  `true`


> **`sourcePath`** \
> Path to put you compiled (and compressed in distribution mode) files. \
For example make `sourcePath` as `/dist/`. \
In `dev mode` take `/src/less/exaple.css` file and put in `/dev/dist/css/example.css` and in `dist mode` and put in `/dist/css/example.css` \
***recomended:*** \
for landing page: `sourcePath: '/'` \
for web projects: `sourcePath: '/dist/'` \
for bitrix websites: `sourcePath: '/local/templates/website/'` \
> **example path**  `/path/to/you/compiled/files/`\
> **warn**  `'sourcePath' must start and end by '/'`\
> **default**  `'/'`


> **`preprocessor`** \
> Preprocessor for css files \
> **variants**  `'less'`, `'sass'`\
> **default**  `'less'`


> **`distExtension`** \
> Extention for page files in `'/'` folder in `distribution mode`  \
> **variants**  `'php'`, `'html'`\
> **default**  `'php'`


> **`distType`** \
> In `distType: false`, files from pug folders `'base_areas', 'components', 'elements', 'contacts', 'include_areas', 'metrix', 'sections'` not converted in html/php files. \
> In `distType: 'bitrix'` if `distExtension: 'php'` in `distribution mode` 
> - pug's `include` change to `require` in php files for bitrix,
> - files from pug folders `'components', 'elements', 'contacts', 'include_areas', 'metrix', 'sections'` get `.php` extention and put in `sourcePath folder/ + name of folder`
> - files form `'base_areas'` get `.php` extention and put in `sourcePath folder/` \
> - string `include /base_areas/header.pug` in pug file transform to
> ```
> <? 
> require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
> $APPLICATION->SetPageProperty("title", "Главная");
> $APPLICATION->SetTitle("Главная страница");
>?>
> ```
> - string `include /base_areas/footer.pug` in pug file transform to
> ```
> <?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
> ```
> **variants**  `false`, `'bitrix'`\
> **default**  `false` \
> **example project**  you can see in `/projects/project.example`
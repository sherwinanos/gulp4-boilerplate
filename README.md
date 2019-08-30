# Gulp 4 Boilerplate
Starter pack with Bootstrap, Sass, Javascript and BrowserSync

## Features
- Concatenate and minify JavaScript.
- Compile and minify Sass.
- Copy static files and folders (images & fonts) into your `/dist` directory.
- Watch for file changes, and automatically recompile build and reload webpages.

## Getting Started
### Dependencies
- [NodeJS](https://nodejs.org/en/)
- Gulp CLI - `npm install -g gulp-cli`

### Quick Start
1. Open your *bash/terminal/command* line
2. Go to your project folder - `cd`
3. Run `npm install` to install dependencies and required files.
4. Run `gulp`
5. It will compile the files into the `/dist` folder.

## Documentation
All new files must be added to `/src` folder and Gulp will compile them into `/dist` folder.

1. HTMLs
   - `/src/index.html` to `/dist/index.html`
2. Javascripts
   - `/src/main.js` to `/dist/js/main.min.js`
   - `/src/vendor/*.js` to `/dist/js/vendor.min.js`
3. Sass
   - `/src/sass/styles.scss` to `/dist/css/styles.min.css`
   - `/src/css/lib/*.css` to `/dist/css/lib.min.css`
4. Images
   - `/src/images/**/*` to `/dist/images/**/*`
5. Fonts
   - `/src/fonts/**/*` to `/dist/fonts/**/*`
6. Partial HTMLs
   - `/src/views/*.html` to `/dist/index.html`

## Others
- `gulpfile.js` holds the Gulp 4 script.
- `package.json` holds all of project details.
- `package-lock.json` ignore and do not edit
- `.gitignore` List of all GIT ignored files and folders


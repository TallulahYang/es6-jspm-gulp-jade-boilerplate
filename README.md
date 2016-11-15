es6-jspm-gulp-boilerplate
=====================================


### Prerequisite's

- This project uses npm `$ npm install npm -g.`
- This project uses JSPM `$ npm install jspm -g`
- This project uses JSPM `JADE/PUG`

---

### Getting up and running

1. Navigate to the root Front End Directory
2. Run `npm install` to install the npm modules
3. Run `jspm install` to install the jspm modules
4. Run `gulp dev` (may require installing Gulp globally `npm install gulp -g`) 
5. Your browser will automatically be opened and directed to the browser-sync proxy address
6. Run `gulp release` to release hotupdate version.
7. if you use nunjucks, you can modify the `index.nunjucks.html` and run `gulp dev_nj` to precompile.

You can input parameters at step 4. `gulp dev --hot runtime` and `gulp dev --hot pre` to choose preCompile or runtime to update the data.


With `gulp` running, the server is up and serving files from the `/src` directory. Any changes in the `/src` directory will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.

---

This setup uses the latest versions of the following libraries:

- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [jspm](http://jspm.io/)

Along with many Gulp libraries (these can be seen in either `package.json`, or at the top of each task in `/gulp/tasks/`).

---

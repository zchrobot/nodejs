* npm init // create package.json file
* npm install express ejs body-parser mongoose dotenv typescript @types/node // like dependencies
    * paczki po stronie servera instalujemy w sekcji [dependencies]
    * paczki po stronie clienta umieszczamy w sekcji [devDependencies npm install packageName -D]
* npm install -g typescript
* create app.ts -> touch app.ts
* tsc app.ts -t ES5

* npm run build // generate js files into dist folder
* npm run serve // run nodemon on index.js with debug mode and run watch

* debug
    * To actually start the debugging process, open up your Google Chrome browser and browse to chrome://inspect.
    * A remote target should already be there, just click inspect. This will bring up the Chrome DevTools.

* trzeba skonfigurowac webpacka z pluginem htmlPlugin aby wstrzykiwal do index.html bundla w katalogu dist, oraz żeby robił transform plików server ts do js





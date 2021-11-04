# Typescript React SSR with Node Express

**React server side rendering in with Node Express server**
This template has the following main dependencies:
* [Typescript](https://www.typescriptlang.org/)
* [Webpack](https://webpack.js.org/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [React Router](https://github.com/remix-run/react-router)


---

### Instalation
1. Clone the repo: `git clone https://github.com/xxx.git`
2. Install dependencies: 
``` bash
$ npm install
```

### Usage

Use one of the following commands:
* run server in watch mode:
``` bash
$ npm run start:server
```
* run client app in dev server with Hot Reload:
``` bash
$ npm run start:client
```
* build both client and server for production:
``` bash
$ npm run build
```

### Project structure
We use the following folder structure to organize the project:

```
root/
├─ client/
│  ├─ src/
│  │  ├─ resources/
│  ├─ package.json
│  ├─ tsconfig.json
├─ server/
│  ├─ src/
│  ├─ package.json
│  ├─ tsconfig.json
├─ shared/
│  ├─ types/
webpack.client.config.ts
webpack.server.config.ts/
```
##### Compilation output
After compilation, all output will be available in the `./dist` folder. The server project will be bundled in the `./dist/app.js` file and client files in the `./dist/public/` folder.

##### Webpack configuration
As you can see, server and client have one webpack configuration file each and they are located in the project root. It will avoid problems with some plugins and loaders.
Also, you can see some code duplication in both configuration files. That's because we want to avoid the complexity of factory functions in a template that the main focus is SSR.


#### Static assets
The static files middleware in the server will serve all files from the `public` folder.

All files from `client/src/resources` will be copied in the `./dist/public` folder during the compilation, keeping the same structure. So the file `./client/src/resources/images/img1.jpg` will be copied to `./dist/public/images/img1.jpg`. 

As such, you can reference the image in your client side code like:
``` html
<img src="images/img1.jpg" />
```

Another example. To fetch the file `./client/src/resources/data/foo.txt` you can:
``` javascript
fetch("data/foo.txt")
    .then(response => response.text())
    .then(text => {
        // do something with the text
    })  
    .catch(e => {...})
```
#### Client vs Server side branching
Out of the box, the global variable `__SERVER__` will be set to true if the code was compiled to target the browser environment.
There are other techniques to branch your logic, some of the are used in the [BrowserApiSample.tsx](https://github.com/marceloaugusto80/react-ssr-express/blob/master/client/src/components/BrowserApiSample.tsx) component.

---
Any bug or improvement, please let us know.
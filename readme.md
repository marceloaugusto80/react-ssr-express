# SSR: Typescript + React + Router + Express + Jest

**React server side rendering with Node Express server**

This template has the following main dependencies:
* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [React Router](https://github.com/remix-run/react-router)
* [Styled Components](https://styled-components.com/)
* [Express](https://expressjs.com/)
* [Webpack](https://webpack.js.org/)
* [Jest](https://jestjs.io/)
* [SuperTest](https://www.npmjs.com/package/supertest)
---

### Instalation
1. Clone the repo: `https://github.com/marceloaugusto80/react-ssr-express.git`
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
This project has the following structure:

```
root/
│
├─ client/
│  ├─ src/
│  │  ├─ resources/
│  ├─ package.json
│  ├─ tsconfig.json
│
├─ server/
│  ├─ src/
│  ├─ package.json
│  ├─ tsconfig.json
│
├─ shared/
│  ├─ types/
│
├─ __tests__/
│  ├─ client/
│  ├─ server/
│
webpack.client.config.ts
webpack.server.config.ts/
```
#### Compilation output
After compilation, all output will be available in the `./dist` folder. The server project will be bundled in the `./dist/app.js` file and client bundles in the `./dist/public/` folder.

### Webpack configuration
As you can see, server and client have one webpack configuration file each and they are located in the project root. It will avoid problems with some plugins and loaders.
Also, you can see some code duplication in both configuration files. That's to avoid the complexity of factory functions in a template where the main focus is SSR.


### Static assets
The server static files middleware will serve all files from the `public` folder.

All files from `client/src/resources` will be copied to `./dist/public` folder during the compilation, keeping the same structure. 
So the file `./client/src/resources/images/img1.jpg` will be copied to `./dist/public/images/img1.jpg`. 

As such, you can reference the image in your client side code like:
``` html
<img src="images/img1.jpg" />
```

Another example. To fetch the file located at `./client/src/resources/data/foo.txt` during development, you can do something like this in your code:
``` javascript
fetch("data/foo.txt")
    .then(response => response.text())
    .then(text => {
        // do something with the text
    })  
    .catch(e => {...})
```
### Client vs Server side branching
The global variable `__SERVER__` will be set to `true` if the code was compiled to target the server (Node) environment. Otherwise, it will have a value of `false`.
There are other techniques to branch your logic, some of them are tested in the [SamplePage1](https://github.com/marceloaugusto80/react-ssr-express/blob/master/client/src/components/SamplePage1.tsx) component.

---
Any bug or improvement, please let me know.
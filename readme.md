# SSR: Typescript + React + Router + Express + Jest

**React server side rendering with persistent server data**

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
* build the application for production:
``` bash
$ npm run build:prod
```
* test:
``` bash
$ npm test
```

#### Compilation output
After compilation, all output will be available in the `./dist` folder. The server logic will be bundled in the `./dist/app.js` file and client assets will be in the `./dist/public/` folder.

### Client vs Server side branching
The global variable `__SERVER__` will be set to `true` if the code was compiled to target the server (Node) environment. Otherwise, it will have a value of `false`.

### Prerendered data persistence
Check the following modules to see how server side data are passed and persisted in the prerendered dom:
```
./src/shared/PrerenderData.ts
./src/client/serverData.ts
```
The examples how to use these modules are in:
```
./src/server/middleware/routing.ts
./src/client/pages/SamplePage1.tsx
```


---
Any bug or improvement, please let me know.
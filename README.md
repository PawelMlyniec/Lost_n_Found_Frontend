# lf-fe

## Prerequisites

- [npm](https://www.npmjs.com/get-npm)
- [yarn](https://classic.yarnpkg.com/en/docs/install) (optional for preference / performance)

## Build Setup

### Npm only:

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

### Yarn:

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Auth0

Authorization and authentication are realized with the help of a 3rd party service _Auth0_.

In order to log into the application the user gets redirected to a defined auth0 domain.\
Upon successful login user's `id_token` and `access_token` are added to local storage of the browser (cookies).\

`id_token` contains user information and `access_token` is used for authentication on backend calls.

More details on how Auth0 integrates with SPAs can be found [here](https://auth0.com/docs/architecture-scenarios/spa-api).

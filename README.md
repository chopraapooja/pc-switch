# PC Switch

### Getting Start

##### Local development

To start server

```shell
yarn start
```

##### Build package
```shell
yarn run build
```

##### Creating tags

Please use `bump-version.sh` to bump tags. It will  change the version in package.json, build the project and then push a new tag
```shell
./bump-version.sh <new version>
```

##### Additional Actions

You can look at the `scripts` portion in `package.json` for additional actions.
```shell
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "build:watch": "rimraf dist && webpack --config webpack.config.js --env.prod",
    "build": "rimraf dist && webpack --config webpack.config.js --env.prod",
    "build:dev": "rimraf dist && webpack --config webpack.config.js",
    "lint": "tslint src/**/*.ts{,x}",
    "start": "webpack-dev-server --config webpack.config.js"
```

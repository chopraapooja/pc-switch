# RHC Images App

This project contains UI code for container images.  
Mocks: https://redhat.invisionapp.com/share/4ANEAAAKU6H#/screens/320380663  
Google Docs: https://docs.google.com/document/d/13j6ihOQNEngqX1i0RR5fLYBuvG0-uju5GqRFXMzpyVY/edit?usp=sharing  


### Getting Start

##### Local development

Run this command to configure `/etc/hosts`
```shell
echo "127.0.0.1 fte.foo.redhat.com ci.foo.redhat.com qa.foo.redhat.com stage.foo.redhat.com prod.foo.redhat.com local.foo.redhat.com" >> /etc/hosts
```

To start server

```shell
yarn start
```

Routes exposed in this project 
* https://{env}.foo.redhat.com:9000/project/{projectID}/view
* https://{env}.foo.redhat.com:9000/project/{projectID}/view?pid={pid}  
env can be `qa|ci|fte|local|prod`


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

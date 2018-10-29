# CampusIoT Mobile App

> This application has been generated with [Ionic for JHipster](https://github.com/oktadeveloper/generator-jhipster-ionic).

[![Build Status][travis-image]][travis-url]

## License
* Apache-2.0 © [Okta](https://developer.okta.com/) for the generated code
* Apache-2.0 for the additional code

## Getting Started

### Install and run

To use this app, run the backend (a JHipster monolythic application):

```bash
git clone https://github.com/CampusIoT/campusiot-app.git
cd campusiot-app
./mvnw
```

Then, install the latest version of the [Ionic CLI](https://ionicframework.com/docs/cli/) and run:

```bash
git clone https://github.com/CampusIoT/campusiot-ion.git
cd campusiot-ion
ionic serve
```
### Getting Started with Android

Install the Android SDK https://developer.android.com/studio/#downloads

Install gradle
```bash
brew install gradle
```

Configure the env var into .bashrc_profile
```bash
export ANDROID_HOME=/Users/$USER/Library/Android/sdk
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

Accept the licenses in the Android SDK

Create an AVD from a Android project for the emulated device (Nexus5XAPI26 in my case : I don't know how to get a AVD)

You can run the application on the Android emulator:
```bash
ionic cordova requirements
ionic cordova platform add android
ionic cordova build android
ionic cordova emulate android
```

Set the address (IP,DNS) of the backend into src/providers/api/api.ts

Set your Android mobile phone/tablet in the dev mode ([howto](https://neilberry.com/blog/post.php?s=2017-01-07-how-to-run-your-ionic-app-on-real-devices)) and activate debug by USB (Go to developer options and enable USB Debugging: Settings > More > Developer Options > Debugging > USB Debugging).

You can install and run the application into your Android mobile phone/tablet (LG G3 in my case):
```bash
ionic cordova build android
adb devices
ionic cordova run  android --device
```
### Getting Started with iOS

Install XCode on your Macbook.

Set the address (IP,DNS) of the backend in src/providers/api/api.ts

You can run the application on the iOS emulator:
```bash
ionic cordova requirements
ionic cordova platform add ios
ionic cordova build ios
ionic cordova emulate ios
```

You can install and run the application on your iOS mobile phone/tablet:
```bash
ionic cordova build ios
ionic cordova run ios --device
```

## Developer section

### TODOLIST


### Tips

You will need to enable CORS in your backend's `src/main/resources/config/application.yml` file. Set the allowed-origins so it works with `ionic serve`:

```yaml
cors:
    allowed-origins: "http://localhost:8100"
```

The emulator runs on port 8080, so you will need to change your backend to run on a different port (e.g., 8888) when running `ionic cordova emulate`. Port 8080 is specified in the following files:

```
{jhipster-project}/src/main/resources/config/application-dev.yml
{jhipster-project}/webpack/webpack.dev.js
{ionic-project}/src/providers/api/api.ts
```

### User

The `User` provider is used to authenticate users through its
`login(accountInfo)` and `signup(accountInfo)` methods, which perform `POST`
requests to an API endpoint that you will need to configure.

### Api

The `Api` provider is a simple CRUD frontend to an API. Simply put the root of
your API url in the Api class and call get/post/put/patch/delete.

## i18n

The Ionic JHipster Starter comes with internationalization (i18n) out of the box with
[ngx-translate](https://github.com/ngx-translate/core). This makes it easy to
change the text used in the app by modifying only one file.

### Adding Languages

To add new languages, add new files to the `src/assets/i18n` directory,
following the pattern of LANGCODE.json where LANGCODE is the language/locale
code (ex: en/gb/de/es/etc.).

## Testing

This starter borrows its testing infrastructure from Daniel Sogl's [Ionic Super Starter](https://github.com/danielsogl/ionic-super-starter). Thanks Daniel!

### Usage

There are a number of scripts in `package.json` you can use to run tests:

```json
"test": "jest",
"test:watch": "jest --watch",
"test:ci": "jest --runInBand",
"test:coverage": "jest --coverage",
"e2e": "npm run e2e-update && npm run e2e-test",
"e2e-test": "protractor ./test-config/protractor.conf.js",
"e2e-update": "webdriver-manager update --standalone false --gecko false"
```

### Unit Tests

[Jest](https://facebook.github.io/jest/) is used as the unit test runner in this project. Jest is a complete and easy to set-up JavaScript testing solution created by Facebook. Some of its benefits are:

- Fast and sandboxed
- Built-in code coverage reports
- Zero configuration

To run a unit test you have three options.

1. Run `npm test` runs all your created unit-tests
2. Run `npm run test:ci` if you want to run the unit-tests with you favorite CI
3. To create a test-coverage report you can run `npm run test:coverage`

Daniel created Ionic Mocks with Jest Support by forking the [ionic-mocks](https://github.com/stonelasley/ionic-mocks) ionic-mock repository. There are still some issues. Feel free to help him out with his [ionic-mocks-jest](https://github.com/danielsogl/ionic-mocks-jest) repository.

If you want to add ionic-native mocks you should definitely check out Chris Griffith's [ionic-native-mocks](https://github.com/chrisgriffith/ionic-native-mocks) repository

See the unit test example at [`src/app/app.component.spec.ts`](src/app/app.component.spec.ts).

### E2E Tests

The E2E test configuration is from the official [ionic-unit-testing-example](https://github.com/ionic-team/ionic-unit-testing-example) repository. The e2e folder structure has been changed a bit.

```
/e2e
  - pages
  - spec
```

Add your pages into the `/pages` folder and your tests into the `/spec` folder.

See the example end-to-end test in [`e2e/spec/app.e2e-spec.ts`](e2e/spec/app.e2e-spec.ts).

To run the e2e tests, build your app for production, then run the tests.

```bash
npm run build --prod
npm run e2e
```

The [Protractor configuration](test/protractor.conf.js) uses [serve](https://www.npmjs.com/package/serve) to serve up the contents of `www` on port 8100 before running its tests.

[travis-image]: https://travis-ci.org/campusiot/campusiot.github.io/logo.svg?branch=master
[travis-url]: https://travis-ci.org/campusiot/campusiot-ion

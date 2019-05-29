# PSST

This is an app for the project in course DM2518 at KTH.

## Install

### Prerequisites

Node v11.8.0
[Yarn](https://yarnpkg.com/lang/en/)
[Cocoapods](https://cocoapods.org/)
[react-native](https://www.npmjs.com/package/react-native)
[react-native-cli](https://www.npmjs.com/package/react-native-cli)
XCode for iOS development

### Clone and install dependencies

```bash
$ git clone https://github.com/gustafguner/dm2518-project-app.git
$ cd dm2518-project-app
$ yarn install
```

### Starting the app (iOS)

Make sure that yarn has installed the dependencies.
Then change directory to `ios` and type `pod install`, then change back to project root and execute `react-native link`. Then start the app by typing `yarn start` in prioject root. Then open the `app.xcworkspace` file in xcode. The app should now be buildable in xcode.

### yarn commands

- start - `Start application`

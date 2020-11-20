# Invst

- [Prerequisites](#prerequisites)
- [Development](#development)
- [Contributing](#contributing)

## Prerequisites

#### Requirements

- [Node JS](https://nodejs.org/en/) (version 14+)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Expo CLI](https://docs.expo.io/workflow/expo-cli/)

#### IDE setup

##### Intellij IDEA

- Go to *Settings / Languagues & Frameworks / JavaScript / Code Quality Tools / ESLint*
  and select **Automatic ESLint configuration** (optionally select **Run eslint --fix on save**).
- Go to [ESLint configuration](.eslintrc.js), right-click and select **Apply ESLint Code Style Rules**.
- Go to [Prettier configuration](.prettierrc), right-click and select **Apply Prettier Code Style Rules**.

## Development

#### Running on your device

- Install Expo application for IOS/Android.
- Follow instructions from [Expo](https://docs.expo.io/get-started/installation/) to setup your device.
- Make sure your PC and mobile device are connected to the same network and no firewall might be blocking the connection.
- Run `yarn start` to start development server with hot-reloading.
- Open up **invst** in the Expo app.

#### Code Quality

- Run `yarn lint` to check for linting and formatting issues in the codebase.
- Run `yarn compile` to check for compilation issues.
- Run `yarn test` to run tests and `yarn test:watch` to run tests in watch mode.

## Contributing

- Your code should have 100% functional test coverage.
- Your PRs should follow [conventional commits](https://www.conventionalcommits.org) guidelines.

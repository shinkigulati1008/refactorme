# React Project - refactorme

Welcome to the `refactorme` React project! Below is an overview of the scripts and installed packages used in this project.

## How to Install

Follow these steps to set up and install the project:

1. **Download the Repository:**
2. cd refactorme
3. npm install
4. npm start
This command will start the development server, and you can view your React app by navigating to http://localhost:3000 in your web browser.

## Installed Packages

### Dependencies
- **@testing-library/jest-dom** (`^5.17.0`): A set of utility functions to work with Jest for DOM testing.
- **react-bootstrap** (`^2.9.2`): Bootstrap components as React components.
- **react-devtools** (`^5.0.0`): Browser extension for inspecting React components.
- **react-router-dom** (`^6.21.3`): Declarative routing for React.
- **react-scripts** (`5.0.1`): Scripts and configuration used by Create React App.
- **react-testing-library** (`^8.0.1`): Simple and complete testing utilities for React.
- **styled-components** (`^6.1.8`): Library for styling React components.
- **web-vitals** (`^2.1.4`): Library for measuring web performance.

### Development Dependencies
- **@babel/plugin-proposal-private-property-in-object** (`^7.21.11`): Babel plugin for supporting private properties in objects.
- **@testing-library/react** (`^14.1.2`): Testing utilities for React.
- **@testing-library/user-event** (`^14.5.2`): Utilities for simulating user events.
- **babel-jest** (`^29.7.0`): Jest transformer for Babel.
- **eslint** (`^8.56.0`): Pluggable JavaScript linter.
- **eslint-config-prettier** (`^9.1.0`): ESLint configuration that turns off rules that conflict with Prettier.
- **eslint-plugin-prettier** (`^5.1.3`): ESLint plugin for running Prettier as an ESLint rule.
- **husky** (`^8.0.3`): Git hooks made easy.
- **istanbul-lib-coverage** (`^3.2.2`): Library for working with Istanbul coverage data.
- **jest** (`^27.5.1`): JavaScript testing framework.
- **lint-staged** (`^15.2.0`): Run linters on pre-committed files.
- **prettier** (`^3.2.4`): Opinionated code formatter.
- **react** (`^18.2.0`): JavaScript library for building user interfaces.
- **react-dom** (`^18.2.0`): Entry point to the DOM and server renderer for React.

## Scripts

### Start Development Server
- `npm start`: Start the development server.

### Build Production Version
- `npm run build`: Build the production version of your application.

### Run Tests
- `npm test`: Run tests using Jest.

### Run Tests Coverage
- `npm test -- --coverage`: Run tests with coverage using Jest.

### Eject Configuration
- `npm run eject`: Eject from Create React App and expose the configuration files.

### Linting and Formatting
- `npm run lint`: Run ESLint on the `src` directory to identify and fix linting issues.
- `npm run format`: Run Prettier on the `src` directory to format code according to defined rules.

### Git Hooks
- A pre-commit hook is set up using Husky and lint-staged to run linting and formatting checks before each commit.

Feel free to explore the project and utilize these tools to maintain code quality and ensure a robust testing environment.
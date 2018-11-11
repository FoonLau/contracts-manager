## Contracts Manager

This project is created through creat-react-app. The solution is based on React/Redux, written in TypeScript.

## Dependencies

* `React` - view
* `Redux` - state management
* `create-react-app` - build tool
* `redux-thunk` - handle side-effects
* `redux-forms` - form components
* `react-bootstrap` layout and components
* `jest` `enzyme`  - unit test libraries

## Structure

All source files are located inside the `src` folder. Unit test files are end up with a `.test.tsx` suffix.

```
  public/
  src/
    app/    -- app config
    components/   
      ContractEditor/
      ContractList/
      Form/
    services/     -- common services
    types/
    index.js      -- entry file
  package.json
```

## Available scripts

`npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

`npm test`

Launches the test runner in the interactive watch mode. Run unit tests.

`npm build`

Builds the app for production to the build folder.

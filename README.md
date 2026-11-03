# Table of Contents:
- [Overview](#micro-frontend-second-inner-app)
- [Prerequisites](#prerequisites)
- [Installing & getting started](#installing--getting-started)
- [How to create injectable module and expose it to parent sites](#how-to-create-injectable-module-and-expose-it-to-parent-sites)
- [Routes of the current app (url tabs)](#routes-of-the-current-app-url-tabs)
- [Available scripts](#available-scripts)

## Micro frontend second inner app

- Uses ***module federation plugin*** from webpack to create injectable ***module***.
- This app is the remote entry of [Micro frontend inner app](https://github.com/DonAdam2/micro-frontend-inner-app)

**_Note:_** This app uses live reloading for local development.

## Prerequisites

- nodeJS ^22.18.0 or >=24.11.0, or Docker

## Installing / Getting Started

### Development (locally):

- Clone repo => `git clone git@github.com:DonAdam2/micro-frontend-second-inner-app.git`
- Navigate to project directory `cd micro-frontend-second-inner-app`
- Install dependencies => `yarn install`
- Start the development server => `yarn start`

### Development (using Docker):

- Clone repo => `git clone git@github.com:DonAdam2/micro-frontend-second-inner-app.git`
- Navigate to project directory `cd micro-frontend-second-inner-app`
- Install dependencies (required for prettier) => `yarn install`
- Start the development server => `docker-compose up web-dev`

## Docker for production (_basic setup_) (modify it to your needs):
- Update the **_production_** section of the **_Dockerfile_** to meet your needs
- Run the following command to build your image => `docker-compose up web-prod`
- The app must be served from the root of its origin (e.g. `https://app.example.com/`), the files of `index.html` use `publicPath: '/'`
  (**/buildTools/webpack.common.js**), change it to serve the app under a sub-path (e.g. `/app/`).
- `yarn install --frozen-lockfile` installs exactly the versions of `yarn.lock`, the build fails if it is out of date.
- The production image serves the app with **nginx** (**/docker/nginx.conf**):
  - unknown routes fall back to `index.html` (react router handles them).
  - `Access-Control-Allow-Origin: *` so the host apps can load the files of the current app (fonts, `remotes.json`, ...).
  - hashed js/css files are cached forever, `index.html`, `remoteEntry.js` and `remotes.json` are revalidated on every request
    (otherwise the host apps would keep loading an old version of the current app after a deploy).

## How to create injectable _module_ and expose it to parent sites

- Open **webpack.common.js** file.<br>
    1- Import ***ModuleFederationPlugin***:
    
    ```
    const { ModuleFederationPlugin } = require('webpack').container
    ```
    
    2- Pass ***ModuleFederationPlugin*** to the ***plugins*** array:
    
    ```
    plugins: [
                new ModuleFederationPlugin({
    ```
                
    3- Specify the name of the current app (must be unique) in ***ModuleFederationPlugin***:<br>
    
    ```
    new ModuleFederationPlugin({
        name: 'second_inner_app',
    ```
        
    4- Set the exposed file name in ***ModuleFederationPlugin***:<br>
    
    ```
    filename: 'remoteEntry.js',
    ```
    
    5- Define the modules you want to expose from the current app in ***ModuleFederationPlugin***:<br>
    
    ```
    exposes: {
       './App': path.join(PATHS.src, 'App'),
    }
    ```
    
    **_Note:_** The key you specify for each module you expose in `exposes` object
     will be used in the host app to import that module: `second_inner_app/App`, e.g. `<RemoteComponent remote="second_inner_app/App" />`.
    
    6- Add the shared dependencies in ***ModuleFederationPlugin***:<br>
        
    ```
    new ModuleFederationPlugin({
        shared: {
          react: { singleton: true, requiredVersion: majorVersionRange('react') },
          'react-dom': {
            singleton: true,
            strictVersion: true,
            requiredVersion: majorVersionRange('react-dom'),
          },
          'react-router-dom': { singleton: true, requiredVersion: majorVersionRange('react-router-dom') },
        },
    }),
    ```

    **_Notes:_**
    - The `shared` configuration must match in the host app and all the remote apps (`react` and `react-dom` must be singletons).
    - `majorVersionRange('react')` returns `^19.0.0`, so an app can be deployed with a newer minor/patch version without breaking the other apps
      (an exact version would make `strictVersion` reject any mismatch).
    - Remote apps are **not** `eager` (only the host app is), so they use the host copy of the shared packages instead of downloading their own.
    - The current app uses the router of the host app when it's rendered inside one (**/src/js/components/shared/OptionalRouter.jsx**),
      otherwise (standalone) it creates its own `BrowserRouter`.
 	
- Create the component you want to expose.
- Create `bootstrap.js` file and move into it all the code from `index.jsx` file.
- Import `bootstrap.js` **dynamically** inside `index.jsx` file.<br>

    ```
     import('./bootstrap');
    ```

## Routes of the current app (url tabs)

- The routes of the current app are **relative** to the url where it's rendered (**/src/App.jsx**):

  ```
  <Routes>
    <Route path=":tab?" element={<TestComponent />} />
  </Routes>
  ```

  - standalone: `/`, `/first`, `/second`, ...
  - inside the container app (its route is `/carousel/*`): `/carousel`, `/carousel/first`, `/carousel/second`, ...

- Each tab has a relative `tabUrl` (**/src/js/containers/TestComponent.jsx**), e.g. `tabUrl: 'second'`.
- **Tabs** reads the active tab from the `tab` param and navigates to `../<tabUrl>`, so it never needs to know where the app is mounted.

**_Notes:_**
- The host app must render the current app in a route that ends with `/*`, otherwise the urls of the tabs don't match any of its routes.
- `react-router-dom` must be shared (singleton) with the host app, so the routes of the current app are added to the host router.
- `HtmlWebpackPlugin` uses `publicPath: '/'`, otherwise opening a nested url directly (e.g. `/carousel/second`) would request `/carousel/js/bundle.js`.
- If the current app gets redux slices, prefix their names with `secondInner` (e.g. `secondInnerTabs`), the host app uses `container` and the inner app `inner`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
It will open [http://localhost:3002](http://localhost:3002) automatically in the browser to see your app.

The page will reload automatically when you make changes (live reloading).<br>

You will see in the console the following:

- Any of the following errors:
  1. Linting errors.
  2. Code format errors (because of [prettier](https://prettier.io/))

### `yarn build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn build:serve`

Serves the app on [http://localhost:8082](http://localhost:8082) from the `dist` folder to check the production version.

**_Note:_** Use this script only if you ran the build script `yarn build`.

### `yarn analyze-bundle`

It allows you to analyze the bundle size.

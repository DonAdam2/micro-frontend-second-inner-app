## Micro frontend:

- Uses ***module federation plugin*** from webpack to create injectable ***module***.
- This app is the remote entry of [Micro frontend inner app](https://github.com/DonAdam2/micro-frontend-inner-app)

**_Note:_** This app uses live reloading for local development.

## How to create injectable ***module*** and expose it to parent sites:

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
     will be used in the host app to import that module: `/second_inner_app/App`.
    
    6- Add the shared dependencies in ***ModuleFederationPlugin***:<br>
        
    ```
    new ModuleFederationPlugin({
        shared: ['react', 'react-dom'],
    }),
    ```
 	
- Create the component you want to expose.
- Create `bootstrap.js` file and move into it all the code from `index.jsx` file.
- Import `bootstrap.js` **dynamically** inside `index.jsx` file.<br>

    ```
     import('./bootstrap');
    ```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
It will open [http://localhost:3002](http://localhost:3002) automatically in the browser to see your app.

All changes will be injected automatically without reloading the page.<br>

You will see in the console the following:

- All redux store related changes
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

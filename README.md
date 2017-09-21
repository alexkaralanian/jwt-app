# JWT by Alex Karalanian

## A fullstack React/Redux starter template w/ Node/Express sever and Sequelize/Postgres DB that uses JSON Web Token Authentication...

* Local loging w/ username + pass
* Google OAuth2 login
* Node / Express RESTful API
* Custom error mesages
* JWT API route protection
* Front-end route protection
* Token set on localStorgae
* Redux for state management
* React Router 4
* PropTypes validation, defaultProps
* ESLint w/ Airbnb rules
* Prettier code formatting
* Hot module reloading
* CSS modules
* Split server and client codebases
* Front-end tests w Jest, Enzyme
* Back end tests w/ Mocha, Chai


## USAGE:

This is a modified creat-react-app template making proxy requests to a node/express server running Concurrently.

#### Client
* CD into Client directory
* npm install or yarn

#### Server + DB
* CD into Server directory (Start the app from here)
* npm install or yarn
* createdb 'appname'

#### Concurrent Client + NodeServer
* CD into Server
* See package.json start scripts
* npm run start-dev-server for full dev experience
* Server and Client run Concurrently
* server runs on localhost: 3001
* client runs on localhost: 3000

#### Linting + Code formatting
* You can itegrate code formatting into your text editor with add the PrettierJS plugin.
* You will need to adjust PrettierJS default settings in your text editor to autosave: true
* Note that you must CD into client OR server in order for Prettier code formatting to auto-save.

#### Social Media Login
* We use the Hello.js client-side SDK, which provides options for integrating multiple strategies.
* Please consult the docs for more details

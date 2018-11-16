# boreholes
Borehole management system for a mine

#### To run the web application you will need to start the back-end;

1. Navigate to _boreholes/backend_.
2. Get the dependencies by running the command: `npm install`
3. Start the server by running the command: `node server.js`

  This will start the REST API server on port **8001** and create a connection to the MySQL database hosted on AWS RDS.

#### Once the back-end is up and running, you can start the front end;

1. Navigate to _boreholes/frontend_
2. Get the dependencies by running the command: `npm install`
3. Start the web server using nodejs http-server module by running the command: `http-server -p 8002`

  If your machine does not have the http-server module already installed please install it using npm with the command: `npm install -g http-server`
  
  Thank you.

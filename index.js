require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 3050;

// Pour utiliser le module Swagger afin de documenter notre API
const expressSwagger = require('express-swagger-generator')(app);
let options = require('./swagger-config.json');
options.basedir = __dirname;
options.swaggerDefinition.host = `localhost:${port}`;
expressSwagger(options);

const apiRouter = require('./app/router');

// parser JSON pour request.body
app.use(express.json());

app.use('/v1', apiRouter);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
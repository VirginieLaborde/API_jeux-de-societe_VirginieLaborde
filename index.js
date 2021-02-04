require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const apiRouter = require('./app/router');

// parser JSON pour request.body
app.use(express.json());

app.use('/v1', apiRouter);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
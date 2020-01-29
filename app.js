const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// import routes
const appRoutes = require('./routes/app');
const apiRoutes = require('./routes/api');

const app = express();

// parse request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set a static directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(appRoutes);
app.use('/api', apiRoutes);

const server = app.listen(2304, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`App listening at https://${host}:${port}`);
});

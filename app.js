const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// import routes
const rootRoutes = require('./routes/root');

const app = express();

// parse request body
app.use(bodyParser.urlencoded({extended: false}));

// set a static directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(rootRoutes);

const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`App listening at https://${host}:${port}`);
});
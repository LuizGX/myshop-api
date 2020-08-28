const express = require('express');
const apiRouter = require('./routes');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    app.use(cors());
    next();
});

app.use('/api/products', apiRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000...');
});
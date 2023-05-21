const express = require('express');
const cors = require('cors');
const app = express();
const employeeRoutes = require('./routes/employee');
const config = require('./config');
require('./model/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/employee', employeeRoutes);

app.listen(config.port, () => {
    console.log(`server running at http://localhost:${config.port}`)
});
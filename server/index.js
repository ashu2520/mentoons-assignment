const express = require('express');
const app = express();
const router = require("./routes/router");
const path = require('path');
require("dotenv").config();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(router);
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

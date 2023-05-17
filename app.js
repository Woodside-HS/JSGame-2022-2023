const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public'))) // finds the public file

app.use((req, res) => { // sends a 404
    res.status(404);
    res.send("<h1>Error 404: page not found</h1>")
})

app.listen(port, () => { // consle logs when the port is listening
    console.log(`listening on: http://localhost:${port}`);
})
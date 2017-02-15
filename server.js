'use strict';
const path = require("path");
const express = require('express');
const morgan = require('morgan')
const port = process.env.PORT || 2567;
const app = express();
app.use(morgan("tiny"));
app.use(express.static(__dirname + '/public'))

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
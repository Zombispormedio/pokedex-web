'use strict';
const connect = require('connect');
const serveStatic = require('serve-static');
const port=process.env.PORT||2567;
connect().use(serveStatic(__dirname+"/public")).listen(port, ()=>{
    console.log(`Server running on ${port}`);
});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv/config');
const middlewares = require('./middlewares');
const routes = require('./src/routes');
const favicon = require('serve-favicon');
const createError = require('http-errors');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname + 'public/uploads/')));
app.use(cors());
app.options('*', cors());

app.use(middlewares);
app.use(routes);

mongoose.connect(process.env.CONNECTION_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connect successfully');
    })
    .catch((err) =>{
        console.log(err);
    });

app.listen(PORT, ()=>{
    console.log('Server is starting http://localhost:3000');
});

/* process.on('uncaughtException', err => { //confirmar uncaughtException or unhandledRejection
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTED!');
    server.close(() => {
        process.exit(1);
    });
}); */

const path = require('path');
const dotenv = require('dotenv')
dotenv.config({ path: './.env' });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./router/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')

app.use(expressLayouts);
app.use(express.static('public'))

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(con => {
        //console.log(con.connections);
        console.log('DB connection successfully')
    });



app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);
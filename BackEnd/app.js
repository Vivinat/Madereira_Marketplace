const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')

//middleware

require('dotenv/config');
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler); 
//Router

const api = process.env.API_URL;
const productsRouter = require('./routes/products')
const ordersRouter = require('./routes/orders')
const categoriesRouter = require('./routes/categories')
const usersRouter = require('./routes/users');

app.use(`${api}/produtos`, productsRouter)
app.use(`${api}/pedidos`, ordersRouter)
app.use(`${api}/categorias`, categoriesRouter)
app.use(`${api}/usuarios`, usersRouter)

module.exports = app

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
//middleware

require('dotenv/config');
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Router

const api = process.env.API_URL;
const productsRouter = require('./routers/products')
const ordersRouter = require('./routers/orders')
const categoriesRouter = require('./routers/categories')
const usersRouter = require('./routers/users')

app.use(`${api}/produtos`, productsRouter)
app.use(`${api}/pedidos`, ordersRouter)
app.use(`${api}/categorias`, categoriesRouter)
app.use(`${api}/usuarios`, usersRouter)


mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database conectada')
})
.catch((err)=> {
    console.log(err);
})

app.listen(3000,()=>{

    console.log("Servidor iniciou no link http://localhost:3000")
})

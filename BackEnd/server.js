const app = require('./app.js')
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database conectada')
    app.listen(3000,()=>{
        console.log("Servidor iniciou no link http://localhost:3000")
    })
})
.catch((err)=> {
    console.log(err);
})
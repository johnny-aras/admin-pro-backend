require('dotenv').config(); 

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app= express();

//configurar CORS
app.use(cors())

//base de datos
dbConnection();

console.log(process.env);
//mean_user
//3OaOuwKk2YCwqfok

//rutas
app.get('/', (req,res)=>{
  res.status(400).json({
    ok:true,
    msg:'Hello World'
  });
})

app.listen(process.env.PORT, ()=>{
  console.log('servidor corriendo en puerto : '+ process.env.PORT);
});
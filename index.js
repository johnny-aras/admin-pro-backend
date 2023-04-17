require('dotenv').config(); 

const express = require('express');
const cors = require('cors')
const path = require('path');

const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app= express();

//configurar CORS
app.use(cors())

//carpeta publica
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//base de datos
dbConnection();

//console.log(process.env);
//mean_user
//3OaOuwKk2YCwqfok

//rutas
// funcion middleware
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));

app.use('/api/todo',require('./routes/busquedas'));

app.use('/api/login',require('./routes/auth'));
app.use('/api/upload',require('./routes/uploads'));


//lo ultimo
app.get('*',(req,res)=>{
  res.sendFile(path.resolve( __dirname,'public/index.html' ));
});


/*app.get('/', (req,res)=>{
  res.status(400).json({
    ok:true,
    msg:'Hello World'
  });
})
*/
app.listen(process.env.PORT, ()=>{
  console.log('servidor corriendo en puerto : '+ process.env.PORT);
});
const mongoose = require('mongoose');

const dbConnection = async() => {    
    try {
    console.log('la con de la lor');
      await mongoose.connect(process.env.DB_CNN);
      
   console.log('DB Online')
  } catch (error) {
    console.log(error);
    throw new Error('Error al iniciar la base de datos. ver logs');
  }    
 }

 module.exports = {
  dbConnection
}
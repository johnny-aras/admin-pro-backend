const Usuario= require('../models/usuario');
const Medico= require('../models/medico');
const Hospital= require('../models/hospital');
const fs = require('fs');


const borrarImagen = (path)=>{

    //subir imagenes de forma asincrona
    if(fs.existsSync(path))
    {
      //borrar la imagen anterior
      fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo,id,nombreArchivo)=>{
  console.log('vamos muy bien !!');

  let pathViejo="";
  switch (tipo) {
    case 'medicos':
      const medico = await Medico.findById(id);
      if(!medico)
      {
        console.log('No es un medico por id');
          return false;
      }
      pathViejo = `./uploads./medicos/${medico.id}`;
      borrarImagen(pathViejo);
      //subir imagenes de forma asincrona
      /*  if(fs.existsSync(pathViejo))
        {
          //borrar la imagen anterior
          fs.unlinkSync(pathViejo);
        }
      */
        medico.img = nombreArchivo;
        await medico.save();
        console.log('meduco actualizado satisafactoriamente');
        return true;
        
    break;
    case 'hospitales':
      const hospital = await Hospital.findById(id);
      if(!hospital)
      {
        console.log('No es un hospital por id');
          return false;
      }
      pathViejo = `./uploads./hospitales/${hospital.id}`;
      borrarImagen(pathViejo);
      
        hospital.img = nombreArchivo;
        await hospital.save();
        console.log('hospital actualizado satisafactoriamente');
        return true;
      
    break;
    case 'usuarios':
      const usuario = await Usuario.findById(id);
      if(!usuario)
      {
        console.log('No es un usuario por id');
          return false;
      }
      pathViejo = `./uploads./usuarios/${usuario.id}`;
      borrarImagen(pathViejo);
      
        usuario.img = nombreArchivo;
        await usuario.save();
        console.log('usuario actualizado satisafactoriamente');
        return true;      
    break;          
  }

}


module.exports={
  actualizarImagen  
}





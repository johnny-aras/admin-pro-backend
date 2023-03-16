const { response } = require("express")
const   Hospital  = require('../models/hospital');


const getHospitales = async(req,res=response)=>{

  const hospitales= await Hospital.find()
                                  .populate('usuario','nombre email img');

  return res.json({
    ok:true,
    hospitales
  });
}


const crearHospital = async(req,res=response)=>{

  const uid= req.uid;
  //dessestrucuturamos el body para obtener el id
  const hospital = new Hospital({
    usuario:uid,
    ...req.body
  });
  
  try {


    const hospitalDB = await hospital.save();

    return res.json({
      ok:true,
      hospital:hospitalDB
    });
    
  } catch (error) {
    res.status(500).json({
      ok:false,
      msg:'Hbale con el administrador' 
    });
  }
}


const actualizarHospital = async(req,res=response)=>{
  const id = req.params.id;
  const uid = req.uid;

  try {

    const hospital = await Hospital.findById(id);
    if(!hospital)
    {
      return res.status(404).json({
        ok:false,
        msg:'hospital no encontrado por su id',        
      });
    }
    //actualizamos el nombre que es el unico campo casi
    //hospital.nombre = req.body.nombre;
      const cambiosHospital={
          ...req.body,
          usuario:uid
      }

      const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true});


    return res.json({
      ok:true,
      //msg:'actualizarHospital',
      hospital:hospitalActualizado
    });
    
  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg:'Hable con el administrador'
    });
  }

}


const borrarHospital = async(req,res=response)=>{

  const id = req.params.id;  

  try {

    const hospital = await Hospital.findById(id);
    if(!hospital)
    {
      return res.status(404).json({
        ok:false,
        msg:'hospital no encontrado por su id',        
      });
    }
    
      await Hospital.findByIdAndDelete(id);


    return res.json({
      ok:true,
      msg:'hosapital eliminado'            
    });
    
  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg:'Hable con el administrador'
    });
  }  
}






module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital
}
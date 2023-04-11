const { response } = require("express")
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');



const getMedicos = async(req,res=response)=>
{
  const medicos= await Medico.find()
                              .populate('usuario','nombre img')
                              .populate('hospital','nombre')
  return res.json({
    ok:true,
   medicos
  });
}


const getMedicoById = async(req,res=response)=>
{
  const id= req.params.id; 
  try{
  const medico= await Medico.findById(id)
                              .populate('usuario','nombre img')
                              .populate('hospital','nombre')
  return res.json({
    ok:true,
    medico
  });
}catch(error)
{
  return res.json({
    ok:false,
    msg:'hable con el administrador'
  });
}
}


const crearMedico = async(req,res=response)=>{

  const uid= req.uid;
  //const hospital = req.hospital;
  //dessestrucuturamos el body para obtener el id
  const medico = new Medico({
    usuario:uid,
    //hospital:hospital,
    ...req.body
  });
  
  try {
    const medicoDB = await medico.save();

    return res.json({
      ok:true,
      medico:medicoDB
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Hbale con el administrador'
    });
  }

}


const actualizarMedico = async(req,res=response)=>{

  const id= req.params.id;  
  const uid = req.uid;
  

  try {

    const medico = await Medico.findById(id);
    if(!medico)
    {
      return res.status(404).json({
        ok:false,
        msg:'Medico no encontrado por su id',        
      });
    }
    //actualizamos el nombre que es el unico campo casi
    //hospital.nombre = req.body.nombre;
      const cambiosMedico={
          ...req.body,
          usuario:uid,
          
      }

      const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true});


    return res.json({
      ok:true,
      //msg:'actualizarHospital',
      medico:medicoActualizado
    });
    
  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg:'Hable con el administrador'
    });
  }
}


const borrarMedico = async(req,res=response)=>{

  const id= req.params.id;      

  try {

    const medico = await Medico.findById(id);
    if(!medico)
    {
      return res.status(404).json({
        ok:false,
        msg:'Medico no encontrado por su id',        
      });
    }    

      await Medico.findByIdAndDelete(id);

    return res.json({
      ok:true,
      msg:'Medico borrado',
      
    });
    
  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg:'Hable con el administrador'
    });
  }

}






module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById
}
const { response } = require("express")
const Medico = require('../models/medico');



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


const actualizarMedico = (req,res=response)=>{

  return res.json({
    ok:true,
    msg:'actualizarMedico'
  });
}


const borrarMedico = (req,res=response)=>{

  return res.json({
    ok:true,
    msg:'borrarMedico'
  });
}






module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico  
}
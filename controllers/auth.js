const { response} = require('express');
const Usuario = require('../models/usuario')

const bcrypt= require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req,res=response)=>
{
  const {email, password}= req.body;

  //Verificar Email
  const usuarioDB = await Usuario.findOne({email});

  if(!usuarioDB)
  {
    return res.status(404).json({
      ok:false,
      msg:'Email no encontrado'
    });
  }

  //Verificar cosntraseña)
  const validPassword = bcrypt.compareSync(password,usuarioDB.password);

  if(!validPassword)
  {
    return res.status(404).json({
      ok:false,
      msg:'Constraseña no valida'
    });
  }

  //genrar TOKEN
  
    const token = await generarJWT(usuarioDB.id);



  try {
    res.json({
      ok:true,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'hable con el administrador'
    });
  }
}


module.exports = {
  login,
}
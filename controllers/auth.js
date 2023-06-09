const { response} = require('express');
const Usuario = require('../models/usuario')

const bcrypt= require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


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
      token,
      menu:getMenuFrontEnd(usuarioDB.role)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'hable con el administrador'
    });
  }
}

const googleSignIn = async(req,res=response)=>
{
  try {
    //const  googleUser = await googleVerify(req.body.token);
    const  {email,name,picture} = await googleVerify(req.body.token);

    const usuarioDB = await Usuario.findOne({email});
    let usuario;
    if(!usuarioDB)
    { 
      usuario = new Usuario({
        nombre:name,
        email,
        password:'@@@@@',
        img:picture,
        google:true
      });
    }else{
      usuario=usuarioDB;
      usuario.google=true;
    }
    //guardar el usuario
    await usuario.save();

    //generar el token - jwt 
    const token = await generarJWT(usuario.id);


    res.json({
      ok:true,
      email,name,picture,
      token,
      menu:getMenuFrontEnd(usuario.role)
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok:false,
      msg:'Token de google no es correcto'
    });   
  }
}

const renewToken = async(req,res=response)=>{

  const uid = req.uid;
  //generar el token - jwt 
  const token = await generarJWT(uid);
  const usuario = await Usuario.findById(uid);                          

  res.json({
    ok:true,
    token,
    usuario,
    menu:getMenuFrontEnd(usuario.role)
  });

}


module.exports = {
  login,
  googleSignIn,
  renewToken

}
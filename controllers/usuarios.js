const {validationResult} = require('express-validator');
const Usuario = require('../models/usuario');

const { response } = require('express');
const  bcrypt  = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async(req,res)=>{

  const desde= Number(req.query.desde) || 0;
  console.log(desde);
  /*const usuarios = await Usuario.find({},'nombre email role google')
                                .skip(desde)
                                .limit(5);
  const total = await Usuario.count();                        
  */
 
  const [usuarios,total] = await Promise.all([
    Usuario.find({},'nombre email role google img')
                                .skip(desde)
                                .limit(5),
    //Usuario.count()
    Usuario.countDocuments()
  ]);
                         

  res.status(400).json({
    ok:true,
    usuarios,
    total
    //uid:req.uid
  });
}

const crearUsuario = async(req,res=response)=>{
  //console.log(req.body);
  const {email,password,nombre}= req.body;
  try {

    const existeEmail = await Usuario.findOne({email});
    if(existeEmail)
    {
      return res.status(400).json({
        ok:'false',
        msg:'El usuario con este email ya esta registrado.'
      });
    }
    
  const usuario = new Usuario(req.body);

  //encriptar constraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password,salt);


  await usuario.save();

   //genrar TOKEN
  
  const token = await generarJWT(usuario.id);


  

  res.status(400).json({
    ok:true,
    usuario,
    token
  });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:'false',
      msg:'Error inesperado...revisar logs'
    });
  }
}

const actualizarUsuario = async(req,res=response) =>    
{
    //validar token y modificar el usuario que corresponde
    const uid = req.params.id;
  try {    

    const usuarioDB = await Usuario.findById(uid);

    if(!usuarioDB)
    {
      return res.status(404).json({
        ok:false,
        msg:'No existe un usuarioi con ese id'

      });
    }

    //Actualizaciones
    const campos = req.body;
    if(usuarioDB.email===req.body.email)
    {
      delete campos.email;
    }else{        
        const existeEmail = await Usuario.findOne({email:req.body.email});
      if(existeEmail)
      {
        return res.status(400).json({
          ok:'false',
          msg:'Ya existe un usuario con ese email'
        });
      }
    }  
    delete campos.password;
    delete campos.google;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});

    res.json({
      ok:true,
      usuarioActualizado
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Error inesperado'
    });
  }

}

const borrarUsuario = async(req,res=response)=>{
 
  const uid = req.params.id;

  try {    

    const usuarioDB = await Usuario.findById(uid);

    if(!usuarioDB)
    {
      return res.status(404).json({
        ok:false,
        msg:'No existe un usuarioi con ese id'

      });
    }      
    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok:true,
      msg:'usuario eliminado'
    });
  }catch(error){

  }
}


module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario
} 
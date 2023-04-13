const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario=require('../models/usuario');

const generarJWT = (uid)=>{

  return new Promise((resolve,reject)=>{

      const payload = {
          uid,
      };

      jwt.sign(payload, process.env.JWT_SECRET,{    
        expiresIn:'12h'
      },(err,token)=>{
        if(err)
        {
          console.log(err);
          reject(err);
        }else{
          resolve(token); 
        }
      }
      );

  });
}

const validar_ADMIN_ROLE= async(req,res=response,next)=>{

  const uid=req.uid;
  
  try {
    
    const usuarioDB=await Usuario.findById(uid);
  
    if(!usuarioDB)
    {
        return res.status(404).json({
        ok:false,
        msg:'No existe el usuario'
      })
    }
    if(usuarioDB.role !=='ADMIN_ROLE')
    {
      return res.status(403).json({
        ok:false,
        msg:'No tiene privilegios para hcer eso'
      })
    }
     next();

  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg:'Hable con el Administrador'
    })
    
  }

}

const validar_ADMIN_ROLE_O_MISMO_USUARIO= async(req,res=response,next)=>{

  const uid=req.uid;
  const id = req.params.id;
  
  try {
    
    const usuarioDB=await Usuario.findById(uid);
  
    if(!usuarioDB)
    {
        return res.status(404).json({
        ok:false,
        msg:'No existe el usuario'
      })
    }
    if(usuarioDB.role !=='ADMIN_ROLE')
    {
      if(uid!==id)
      {
        return res.status(403).json({
          ok:false,
          msg:'No tiene privilegios para hcer eso'
        })
      }
    }
     next();

  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg:'Hable con el Administrador'
    })
    
  }

}

module.exports={
  generarJWT,
  validar_ADMIN_ROLE,
  validar_ADMIN_ROLE_O_MISMO_USUARIO
}
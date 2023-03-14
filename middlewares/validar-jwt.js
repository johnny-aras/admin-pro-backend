const { response } = require("express");
const  jsonWebToken  = require("jsonwebtoken");



const validarJWT =  (req,res=response,next)=>{


  //Leer el Token
  const token = req.header('x-token');

  if(!token)
  {
    return res.status(401).json({
      ok:false,
      msg:'No hay token dentro de la peticion'
    });
  }

  try {

    const {uid}= jsonWebToken.verify(token, process.env.JWT_SECRET);
    req.uid=uid;
    next();
    console.log(uid);

    
  } catch (error) {
    return res.status(401).json({
      ok:false,
      msg:'Token no valido'
    });
    
  }


  //console.log(token);

 
}


module.exports = {
  validarJWT
}
   



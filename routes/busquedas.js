/*
Ruta: api/todo/:busqueda
*/ 
/* 
  Ruta:/api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');


const {getBusqueda,getDocumentosColeccion} =require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router(); 

router.get('/:busqueda',validarJWT,getBusqueda);
router.get('/coleccion/:tabla/:busqueda',validarJWT,getDocumentosColeccion);



module.exports = router;
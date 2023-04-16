/* 
  Ruta:/api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios,crearUsuario,actualizarUsuario ,borrarUsuario} = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validar_ADMIN_ROLE, validar_ADMIN_ROLE_O_MISMO_USUARIO } = require('../helpers/jwt');


const router = Router(); 

router.get('/',
validarJWT,
validar_ADMIN_ROLE,
getUsuarios);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos,

],crearUsuario);

router.put('/:id',[
    validarJWT,
    validar_ADMIN_ROLE_O_MISMO_USUARIO,
    check('nombre','El nombre es obligatorio').not().isEmpty(),    
    check('email','El email es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos,
],actualizarUsuario);

router.delete('/:id',validarJWT,validar_ADMIN_ROLE,borrarUsuario);


module.exports = router;
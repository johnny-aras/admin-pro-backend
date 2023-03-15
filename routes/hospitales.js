/*¨
Ruta: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios,crearUsuario,actualizarUsuario ,borrarUsuario} = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital} = require('../controllers/hospitales');


const router = Router(); 

router.get('/',getHospitales);

router.post('/',[    
  validarJWT,
  check('nombre','El nombre es requerido').not().isEmpty(),
  validarCampos
],  crearHospital,
);

router.put('/:id',[    
],actualizarHospital);

 router.delete('/:id',borrarHospital);


module.exports = router;
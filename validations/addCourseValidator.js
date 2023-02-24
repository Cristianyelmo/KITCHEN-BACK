const {check} = require('express-validator');


module.exports = [
check('title')
     .notEmpty().withMessage('El titulo del curso es obligatorio').bail()
     .isLength({min:5,max:20}).withMessage('El titulo debe tener en 5 y 20 caracteres'),

     check('price')

     .notEmpty().withMessage('El precio es obligatorio').bail()
     
     .isInt({min:1}).withMessage('Solo numeros positivos'),


     check('chef')

     .notEmpty().withMessage('Quien es el chef?').bail(),


     check('description')
     .notEmpty().withMessage('La descripcion es obligatorio').bail()
     .isLength({min:2,max:3}).withMessage('La descripcion debe tener entre 20 y 30 caracteres'),


     check('section')

     .notEmpty().withMessage('A que seccion pertenece?')



]
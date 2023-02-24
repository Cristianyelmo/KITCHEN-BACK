const {check,body}  =require('express-validator');


module.exports = [
  check('name')
       .notEmpty().withMessage('el nombre es obligatorio').bail()
       
       .isLength({min:2}).withMessage('Minimo 2 letras')
       .isAlpha().withMessage('Solo caracteres alfabetica'),

       check('surname')
       .notEmpty().withMessage('el apellido es obligatorio').bail()
       
       .isLength({min:2}).withMessage('Minimo 2 letras')
       .isAlpha().withMessage('Solo caracteres alfabetica'),

       check('email')
       .notEmpty().withMessage('el email es obligatorio').bail()
       
       .isEmail().withMessage('Debe ser una email valido'),

       check('password')
       .notEmpty().withMessage('La contraseña es obligatoria').bail()
       .isLength({min:6,max:12}).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

       body('password2')
       .notEmpty().withMessage('Debes confirmar tus contraseñas').bail()
       
       .custom((value,{req})=> {

           
           if(value !== req.body.password){
            return false
           }
return true

       }

      

       
       ).withMessage('La contraseña no coinciden')
     








]
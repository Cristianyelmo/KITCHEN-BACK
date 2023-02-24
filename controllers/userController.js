const users = require('../data/courses.json');
const fs = require('fs');

const {validationResult}=require('express-validator')
const {hashSync}=require('bcryptjs')


module.exports = {
    register : (req,res) => {
        return res.render('users/register',{
            title : "Registro de usuario"
        })
    },
    login : (req,res) => {
        return res.render('users/login',{
            title : "Inicio de sesión"
        })
    },
    profile : (req,res) => {
        return res.render('users/profile',{
            title : "Perfil de usuario"
        })
    },

    
    processRegister:(req,res)=>{

        
const errors = validationResult(req);





if(errors.isEmpty()){
    
    
    
    const{name,surname,email,password} = req.body

    const newUsers = {
        id: users.length ? users[users.length -1].id +1 : 1,
        name : name.trim(),
        surname : surname.trim(),
        email:email.trim(),
        password:hashSync(password,10)
        

      };

      users.push(newUsers);
fs.writeFileSync('./data/users.json',JSON.stringify(users, null, 3),'utf-8')
      return res.redirect('/users/login');
}else {
    return res.send(errors.mapped())

}





    },

    

    
    processLogin:(req,res)=>{
return res.send(req.body)




    },


    

    

    
   update2:(req,res)=>{
return res.send(req.body)




    }





}

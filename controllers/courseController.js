const fs = require('fs');
const courses = require('../data/courses.json');

const { body } = require('express-validator');
const chefs = require('../data/chefs.json');
const chefsSort = chefs.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);






const {validationResult} = require('express-validator')

module.exports = {
  list: (req, res) => {
    const courses = JSON.parse(fs.readFileSync('./data/courses.json','utf-8'));

    return res.render("courses/list", {
      title: "Lista de cursos",
      courses: courses.filter(course => course.visible)
    });
  },
  detail: (req, res) => {
    const { id } = req.params;
    const courses = JSON.parse(fs.readFileSync('./data/courses.json','utf-8'));
    const course = courses.find(course => course.id === +id);

    return res.render("courses/detail", {
      title: "Detalle del curso",
      ...course,
    });
  },
  add: (req, res) => {
    return res.render('courses/formAdd', {
      chefs: chefsSort
    })
  },
  store: (req, res) => {
 
    const errors= validationResult(req)

   

  /*   return res.send(errors) */
  
  
  if(!req.files.length){
errors.errors.push({
value:"",
msg:"El producto debe tener una imagen",
param:"images",
location:"files"

})



  }

  if(req.multerError){
    errors.errors.push({
    value:"",
    msg:"El producto debe tener 3 images",
    param:"images",
    location:"files"
    
    })
    
    
    
      }





  
  
  if(errors.isEmpty()){
    const { title, price, description, section, chef, visible } = req.body;

    const newCourse = {
      id: courses[courses.length - 1].id + 1,
      title : title.trim(),
      price: +price,
      description: description.trim(),
      
      image: req.files.map(file =>file.filename),



      chef,
      sale: section === "sale" && true,
      newest: section === "newest" && true,
      free: section === "free" && true,
      visible : visible ? true : false
    };

    courses.push(newCourse);

    fs.writeFileSync('./data/courses.json',JSON.stringify(courses, null, 3),'utf-8')

    return res.redirect('/courses/list');
  }

  
  
  
  
  
  else {

    const chefs = require('../data/chefs.json');
const chefsSort = chefs.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);




if(req.files.length){

  req.files.forEach(file => {
    fs.existsSync(`./public/images/courses/${file.filename}`) && fs.unlinkSync(`./public/images/courses/${file.filename}`)
  });
  
  




}







    return res.render('courses/formAdd', {
      chefs: chefsSort,
      errors:errors.mapped(),
      old: req.body
    })
  }



   
  },
  edit: (req, res) => {
    const { id } = req.params;

    const course = courses.find(course => course.id === +id);
    return res.render('courses/formEdit', {
      ...course,
      chefs: chefsSort
    })
  },
  update : (req,res) => {
    /* recibo la info del formulario */

    const errors= validationResult(req);

    
    
    if(errors.isEmpty()){

      
    const { title, price, description, section, chef, visible } = req.body;

   
    
    const id = +req.params.id

    /* recupero los datos del curso */
    const course = courses.find(course => course.id === +id);

    /* guardo en un objeto la información modificada */
    const courseUpdated = {
      id,
      title : title.trim(),
      price: +price,
      description: description.trim(),
      image: course.image,
      chef,
      sale: section === "sale" && true,
      newest: section === "newest" && true,
      free: section === "free" && true,
      visible : visible ? true : false
    };

    /* actualizar mi array de cursos */
    const coursesModified = courses.map(course => {
      if(course.id === id){
        return courseUpdated
      }
      return course
    });

    //console.log(coursesModified);

    /* guardar los cambios */
    fs.writeFileSync('./data/courses.json',JSON.stringify(coursesModified, null, 3),'utf-8')

    return res.redirect(`/courses/detail/${id}`)
    
  }else{

    const { id } = req.params;

    const course = courses.find(course => course.id === +id);
    return res.render('courses/formEdit', {
      ...course,
      chefs: chefsSort,
      errors:errors.mapped(),
      old:req.body
    })


  }



  },
  removeConfirm : (req,res) => {
    const id = req.params.id;
    const course = courses.find(course => course.id === +id);

    return res.render('courses/confirmRemove',{
      ...course
    })
  },
  remove : (req,res) => {
    const id = req.params.id;
    const coursesModified = courses.filter(course => course.id !== +id);

    //console.log(coursesModified);
    
    /* guardar los cambios */
    fs.writeFileSync('./data/courses.json',JSON.stringify(coursesModified, null, 3),'utf-8')
    return res.redirect(`/courses/list`)   
  }

     

};

const express = require('express');

const estudianteController = require('../controllers/estudiante');
const userController = require('../controllers/userController');

const router = express.Router();

// gets
router.get('/student/id', estudianteController.getStudentId);
router.get('/student/correo', estudianteController.getStudentCorreo);
router.get('/students', estudianteController.getStudents);
router.post('/buscaestudiantes', estudianteController.postBuscaEstudiantes);  
router.post('/estudiante', estudianteController.getStudentCodigo);  



//posts 
router.post('/student', estudianteController.postStudent);
router.put('/student', estudianteController.putStudent);
router.post('/studentgrade', estudianteController.studentgrade);


module.exports = router;


// login /user / auth
router.post('/user', userController.postUser);  
router.put('/user', userController.loginupdate);  
router.post('/login', userController.login);  
router.delete('/user', userController.deletetUser);  
router.get('/users', userController.getUsers);

const express = require('express');

const estudianteController = require('../controllers/estudiante');
const router = express.Router();

// gets
router.get('/student/id', estudianteController.getStudentId);
router.get('/student/correo', estudianteController.getStudentCorreo);
router.get('/students', estudianteController.getStudents);


//posts 
router.post('/student', estudianteController.postStudent);
router.put('/student', estudianteController.putStudent);

module.exports = router;

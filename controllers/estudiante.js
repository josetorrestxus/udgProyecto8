const Estudiante = require('../models/estudiante');
const { ObjectId } = require('mongodb');
const {v4: uuidv4 } = require('uuid') ;


function yyyymmdd(dat = new Date()) {
  function twoDigit(n) { return (n < 10 ? '0' : '') + n; }
  return '' + dat.getFullYear() + twoDigit(dat.getMonth() + 1) + twoDigit(dat.getDate());
}

// un solo estudiante pero con las carreras


exports.getStudentId = (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  Estudiante.findOne({_id : ObjectId(id)})
  .then(data => {
    console.log(data);
    
    res.status(200).json({
      status: 'success',
      data
    });
    res.end;
    
  })
  .catch(err => console.log(err));
};

exports.getStudentCorreo = (req, res, next) => {
  const correo = req.query.correo;
  Estudiante.findOne({correo})
  .then(data => {
    console.log(data);
    
    res.status(200).json({
      status: 'success',
      data
    });
    res.end;
    
  })
  .catch(err => console.log(err));
};


exports.getStudents = (req, res, next) => {
  Estudiante.find({})
  .then(data => {
    console.log(data);
    
    res.status(200).json({
      status: 'success',
      data
    });
    res.end;
    
  })
  .catch(err => console.log(err));
};

exports.postStudent = (req, res, next) => {
  console.log (req.body);
  if (req.body.correo && req.body.nombre) {

    
    const correo= req.body.correo ;
    const nombre= req.body.nombre;
    const correoInstitucional= req.body.correoInstitucional || '';
    const imageUrl= req.body.imageUrl || '';
    const admision= req.body.admision || '';
    const estatus= req.body.estatus || 'activo';
    const nivel= req.body.nivel || 'bachiller';
    const situacion= req.body.situacion || '';
    const ciclos= req.body.ciclos || 0;
    const ultimoCiclo= req.body.ultimoCiclo || '';
    const carrera= req.body.carrera || 'bachiller';
    const sede= req.body.sede || 'principal';
    const creditos= req.body.creditos || 0;
    const fecha= req.body.fecha || '';
    const promedio= req.body.promedio || 0;
    const calificaciones= req.body.calificaciones || [];
  
    
    Estudiante.findOne({correo})
    .then(estud => {
      if (!estud) {
        
        const stu = new Estudiante({
          correo,
          nombre,
          correoInstitucional,
          imageUrl,
          admision,
          estatus,
          nivel,
          situacion,
          ciclos,
          ultimoCiclo,
          carrera,
          sede,
          creditos,
          fecha,
          promedio,
          calificaciones
        });
        stu.save();
        
        res.status(200).json({estatus: 'ok'});
        res.end();
        
      } else  {
        res.status(400).json({estatus: 'error, correo ya existe'});
        res.end();
      }
      
    })
    .catch(err => console.log(err));



  } else {
    res.status(400).json({
      status: 'error',
      error: 'Debe tener correo y nombre.'
    });
    res.end;
  }

};



exports.putStudent = (req, res, next) => {
  console.log (req.body);
  if (req.body.correo && req.body.nombre) {

    const datos = {
      correo: req.body.correo, 
      nombre: req.body.nombre,
      correoInstitucional: req.body.correoInstitucional || '',
      imageUrl: req.body.imageUrl || '',
      admision: req.body.admision || '',
      estatus: req.body.estatus || 'activo',
      nivel: req.body.nivel || 'bachiller',
      situacion: req.body.situacion || '',
      ciclos: req.body.ciclos || 0,
      ultimoCiclo: req.body.ultimoCiclo || '',
      carrera: req.body.carrera || 'bachiller',
      sede: req.body.sede || 'principal',
      creditos: req.body.creditos || 0,
      fecha: req.body.fecha || '',
      promedio: req.body.promedio || 0,
      calificaciones: req.body.calificaciones || []
    }
    
    Estudiante.findOne({correo: datos.correo})
    .then(stu => {
      if (stu) {
        console.log('entro a actualizar');
        console.log(stu);
        stu.correoInstitucional= datos.correoInstitucional;
        stu.imageUrl= datos.imageUrl;
        stu.admision= datos.admision;
        stu.estatus= datos.estatus;
        stu.nivel= datos.nivel;
        stu.situacion= datos.situacion;
        stu.ciclos= datos.ciclos;
        stu.ultimoCiclo= datos.ultimoCiclo;
        stu.carrera= datos.carrera;
        stu.sede= datos.sede;
        stu.creditos= datos.creditos;
        stu.fecha= datos.fecha;
        stu.promedio= datos.promedio;
        stu.calificaciones= datos.calificaciones;
        stu.save();
        
        res.status(200).json({estatus: 'ok'});
        res.end;
        
      } else  {
        res.status(400).json({estatus: 'error, correo ya existe'});
        res.end();
      }
      
    })
    .catch(err => console.log(err));



  } else {
    res.status(400).json({
      status: 'error',
      error: 'Debe tener correo y nombre.'
    });
    res.end;

  }

  


  
  Estudiante.find({})
  .then(data => {
    console.log(data);
    
    res.status(200).json({
      status: 'success',
      data
    });
    res.end;
    
  })
  .catch(err => console.log(err));
};

  



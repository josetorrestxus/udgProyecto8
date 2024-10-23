const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
  correo: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  correoInstitucional: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  admision: {
    type: String,
    required: true
  },
  estatus: {
    type: String,
    required: true
  },
  nivel: {
    type: String,
    required: false
  },
  situacion: {
    type: String,
    required: false
  },
  ciclos: {
    type: Number,
    required: false,
    default: 0
  },
  ultimoCiclo: {
    type: String,
    required: false
  },
  carrera: {
    type: String,
    required: false
  },
  sede: {
    type: String,
    required: false
  },
  creditos: {
    type: Number,
    required: false
  },
  fecha: {
    type: String,
    required: false
  },
  promedio: {
    type: Number,
    required: false
  },
  fecActualizacion : { type : Date, default: Date.now },
  calificaciones: [
    {
      materia: { 
        type: String, 
        required: false 
      },
      calificacion: { 
        type: String, 
        required: false
      },
      ciclo: { 
        type: String, 
        required: false
      }
    }
  ]
});

estudianteSchema.pre('save', function (next) {
  this.fecActualizacion = Date.now();
  next();
 });

module.exports = mongoose.model('estudiante', estudianteSchema);

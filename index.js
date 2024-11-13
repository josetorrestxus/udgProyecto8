// librerias
const User = require('./models/user');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
const adminRoutes = require('./routes/admin');

//cofiguraaciones
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors())
app.use(express.json())


const validateTokenMiddleware= function ( req, res, next) {
  
  console.log('entro a validarToken' + req.baseUrl);
  if (req && req.headers && typeof next === 'function') {
    const authorization = req.header('Authorization') || ''
    // console.log('authorization')
    // console.log(authorization)
    if (authorization && authorization.trim()) {
      const authorizationParts = authorization.trim().split(' ')
      // console.log('authorizationParts')
      // console.log(authorizationParts)
      if (authorizationParts.length === 2 && authorizationParts[0] === 'Bearer') {
        const token= authorizationParts[1]
          // console.log(token)
          if (token === process.env.TOKEN) {
          next()
        } else {
          res.locals.status = 401
          next(new Error('Token Invalido.'))
        }
      } else {
        res.locals.status = 401
        next(new Error('Authorization header es incorrecto.'))
      }
    } else {
      res.locals.status = 401
      next(new Error('Authorization header es requerido.'))
    }
  } else if (typeof next === 'function') {
    next(new Error('Parametro "req" es requerido. Headers son requeridos.'))
  } else {
    throw new Error('Parametro "req" es requerido. La función "next" es requerida.')
  }


}


app.use(validateTokenMiddleware);

// ruta raiz
app.use('/api', adminRoutes);

// ruta para revisar si esta activo
app.get('/status', (req, res, next) => {
  res.status(200).json({
    status: 'Version 1.0.0',
    comment: 'Primera version liberada'
  })
})


// Se abre base de datos
console.log(process.env.CONNECTION_STRING);
mongoose
  .connect(
    process.env.CONNECTION_STRING, 
    { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false , dbName: 'alumnos'},
  )
  .then(result => {
    console.log('Se abrió correctamente la BD mongo local');
    // console.log(result);
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'jtorres',
          email: 'jtorres19749@gmail.com'

        });
        user.save();
      }
    });
  })

// ejecucion del servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor ejecutandose correctamente en puerto: ${process.env.PORT}`);
})
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
    { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false , dbName: 'udgproyectoviii'},
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
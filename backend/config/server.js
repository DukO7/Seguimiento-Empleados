const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(express.json());

//Configuración de CORS se agrega validacion de credenciales, constante para modificacion de origen y headers
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'seguimiento_empleados'
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

//Bloque para registrar empleados
// app.post('/register', async (req, res) => {
//   try {
//     const { email, nick, password, edad } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const query = 'INSERT INTO users (email, nick, password, edad) VALUES (?, ?, ?, ?)';
//     db.query(query, [email, nick, hashedPassword, edad], (err, results) => {
//       if (err) {
//         console.error('Error al registrar usuario en la base de datos:', err);
//         res.status(400).send('Error al registrar usuario');
//       } else {
//         res.status(201).send('Usuario registrado');
//       }
//     });
//   } catch (error) {
//     console.error('Error en el registro de usuario:', error);
//     res.status(400).send('Error en el registro de usuario');
//   }
// });

//Bloque para login
app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;

    // Supongamos que la tabla de empleados tiene campos para usuario, contraseña y es_admin
    const query = 'SELECT id, usuario, contraseña, es_admin,nombre FROM empleados WHERE usuario = ?';
    db.query(query, [usuario], (err, results) => {
        if (err) {
            console.error('Error al buscar empleado:', err);
            res.status(500).send('Error al buscar empleado');
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            const isPasswordValid = bcrypt.compareSync(contraseña, user.contraseña);
            if (isPasswordValid) {
                res.json({
                    usuario: user.usuario,
                    es_admin: user.es_admin,
                    id: user.id,
                    nombre:user.nombre
                });
            } else {
                res.status(401).send('Credenciales no válidas');
            }
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    });
});
//Bloque obtencion de empleados
app.get('/Obempleados', (req, res) => {
  const query = 'SELECT * FROM empleados';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener empleados:', err);
      res.status(500).send('Error al obtener empleados');
      return;
    }
    res.json(results);
  });
});

//Bloque para ingresar empleado
app.post('/empleado', (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, fecha_ingreso, fecha_nacimiento, puesto, salario, usuario, contraseña,foto,is_admin } = req.body;
  const id = uuidv4(); // Generar un UID para el empleado
  const hashedPassword = bcrypt.hashSync(contraseña, 10); // Hashear la contraseña

  const query = 'INSERT INTO empleados (id, nombre, apellido_paterno, apellido_materno, fecha_ingreso, fecha_nacimiento, puesto, salario, usuario, contraseña,fotografia,es_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)';
  db.query(query, [id, nombre, apellido_paterno, apellido_materno, fecha_ingreso, fecha_nacimiento, puesto, salario, usuario, hashedPassword,foto,is_admin], (err, results) => {
    if (err) {
      console.error('Error al agregar empleado:', err);
      res.status(500).send('Error al agregar empleado');
      return;
    }
    res.status(201).send('Empleado agregado');
  });
});

//Bloque modificar empleado
app.put('/empleado/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido_paterno, apellido_materno, fecha_ingreso, fecha_nacimiento, puesto, salario, usuario, contraseña, foto } = req.body;
    const hashedPassword = bcrypt.hashSync(contraseña, 10); // Hashear la nueva contraseña
  
    const query = 'UPDATE empleados SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, fecha_ingreso = ?, fecha_nacimiento = ?, puesto = ?, salario = ?, usuario = ?, contraseña = ?, fotografia = ? WHERE id = ?';
    db.query(query, [nombre, apellido_paterno, apellido_materno, fecha_ingreso, fecha_nacimiento, puesto, salario, usuario, hashedPassword, foto, id], (err, results) => {
      if (err) {
        console.error('Error al actualizar empleado:', err);
        res.status(500).send('Error al actualizar empleado');
        return;
      }
      
      res.send('Empleado actualizado');
    });
  });
  

//Bloque para eliminar empleado
app.delete('/empleadodelete/:id', (req, res) => {
    const { id } = req.params; // Cambia `uuid` a `id` aquí
    const query = 'DELETE FROM empleados WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al eliminar empleado:', err);
        res.status(500).send('Error al eliminar empleado');
        return;
      }
      res.send('Empleado eliminado');
    });
  });

//Bloque para obtener todos los beneficiarios
app.get('/beneficiarios', (req, res) => {
    const query = `
        SELECT beneficiarios.*, empleados.nombre AS empleado_nombre
        FROM beneficiarios
        JOIN empleados ON beneficiarios.empleado_id = empleados.id;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener beneficiarios:', err);
            res.status(500).send('Error al obtener beneficiarios');
            return;
        }
        res.json(results);
    });
});
//Bloque para obtener beneficiarios de empleado
app.get('/beneficiarios/:id', (req, res) => {
    console.log('datos:',req.params);
    const { id } = req.params;
    const query = 'SELECT * FROM beneficiarios WHERE empleado_id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al obtener beneficiarios:', err);
        res.status(500).send('Error al obtener beneficiarios');
        return;
      }
      res.json(results);
    });
  });
//Bloque para agregar un beneficiario
app.post('/beneficiarios', (req, res) => {
    console.log('esto llega de beneficiarios:',req.body);
  const { nombre, apellido_paterno, apellido_materno, parentesco, empleado_uuid } = req.body;
  console.log('este es el id del empleado:',empleado_uuid)
  const id = uuidv4(); // Generar un UID para el beneficiario

  const query = 'INSERT INTO beneficiarios (id, nombre, apellido_paterno, apellido_materno, parentesco, empleado_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [id, nombre, apellido_paterno, apellido_materno, parentesco, empleado_uuid], (err, results) => {
    if (err) {
      console.error('Error al agregar beneficiario:', err);
      res.status(500).send('Error al agregar beneficiario');
      return;
    }
    res.status(201).send('Beneficiario agregado');
  });
});

//Bloque para actualizar un beneficiario
app.put('/beneficiarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido_paterno, apellido_materno, parentesco,empleado_id,uuid} = req.body;
  const query = 'UPDATE beneficiarios SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, parentesco = ? WHERE id = ?';
  db.query(query, [nombre, apellido_paterno, apellido_materno, parentesco, uuid], (err, results) => {
    if (err) {
      console.error('Error al actualizar beneficiario:', err);
      res.status(500).send('Error al actualizar beneficiario');
      return;
    }
    res.send('Beneficiario actualizado');
  });
});

//Bloque para eliminar un beneficiario
app.delete('/beneficiarios/:id', (req, res) => {
  console.log('recibo eliminar:',req.params);
  const { id } = req.params;
  const query = 'DELETE FROM beneficiarios WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar beneficiario:', err);
      res.status(500).send('Error al eliminar beneficiario');
      return;
    }
    res.send('Beneficiario eliminado');
  });
});
//Bloque para actualizar foto
app.put('/empleado/foto/:id', (req, res) => {
    const { id } = req.params;
    const { foto } = req.body;
    const query = 'UPDATE empleados SET fotografia = ? WHERE id = ?';
    db.query(query, [foto, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar la foto del empleado:', err);
            res.status(500).send('Error al actualizar la foto del empleado');
            return;
        }
        res.send('Foto del empleado actualizada');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

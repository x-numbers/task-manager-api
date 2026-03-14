const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs').promises
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = express()
const PORT = 3000

app.use(bodyParser.json())

const obtenerTareas = async () => {
  const data = await fs.readFile('tareas.json', 'utf8')
  return JSON.parse(data)
}

const guardarTareas = async (tareas) => {
  await fs.writeFile('tareas.json', JSON.stringify(tareas, null, 2))
}

app.post('/register', async (req, res) => {
  const { usuario, password } = req.body
  const hash = await bcrypt.hash(password, 10)

  const usuarios = JSON.parse(await fs.readFile('usuarios.json', 'utf8'))
  usuarios.push({ usuario, password: hash })

  await fs.writeFile('usuarios.json', JSON.stringify(usuarios, null, 2))
  res.send('Usuario registrado')
})

app.post('/login', async (req, res) => {
  const { usuario, password } = req.body
  const usuarios = JSON.parse(await fs.readFile('usuarios.json', 'utf8'))

  const user = usuarios.find(u => u.usuario === usuario)
  if (!user) return res.status(401).send('Usuario no válido')

  const valido = await bcrypt.compare(password, user.password)
  if (!valido) return res.status(401).send('Contraseña incorrecta')

  const token = jwt.sign({ usuario }, 'clave_secreta', { expiresIn: '1h' })
  res.json({ token })
})

const autenticarToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) return res.status(401).send('Acceso denegado')

  jwt.verify(token, 'clave_secreta', (err, user) => {
    if (err) return res.status(403).send('Token inválido')
    req.user = user
    next()
  })
}

app.get('/tareas', async (req, res) => {
  try {
    const tareas = await obtenerTareas()
    res.json(tareas)
  } catch (error) {
    res.status(500).send('Error al leer las tareas')
  }
})

app.post('/tareas', async (req, res) => {
  const tareas = await obtenerTareas()
  const nuevaTarea = {
    id: Date.now(),
    titulo: req.body.titulo,
    descripcion: req.body.descripcion
  }

  tareas.push(nuevaTarea)
  await guardarTareas(tareas)

  res.status(201).json(nuevaTarea)
})

app.put('/tareas/:id', async (req, res) => {
  const tareas = await obtenerTareas()
  const id = parseInt(req.params.id)

  const index = tareas.findIndex(t => t.id === id)
  if (index === -1) {
    return res.status(404).send('Tarea no encontrada')
  }

  tareas[index] = { ...tareas[index], ...req.body }
  await guardarTareas(tareas)

  res.json(tareas[index])
})

app.delete('/tareas/:id', async (req, res) => {
  const tareas = await obtenerTareas()
  const id = parseInt(req.params.id)

  const nuevasTareas = tareas.filter(t => t.id !== id)
  await guardarTareas(nuevasTareas)

  res.send('Tarea eliminada')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Error en el servidor')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})



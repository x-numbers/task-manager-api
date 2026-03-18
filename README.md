API de Tareas con Node.js y Express

API RESTful desarrollada con Node.js y Express. permite gestionar tareas (CRUD completo) y autenticación de usuarios mediante JWT.

--------------------------------------------------------------------------------------------------------------------------------------------

La aplicación permite:

- Crear tareas

- Consultar tareas

- Actualizar tareas

- Eliminar tareas

- Registrar usuarios

- Iniciar sesión con autenticación segura

--------------------------------------------------------------------------------------------------------------------------------------------

Tecnologías utilizadas

- Node.js

- Express

- body-parser

- jsonwebtoken (JWT)

- bcryptjs

- fs.promises (manejo de archivos)

--------------------------------------------------------------------------------------------------------------------------------------------

Estructura del proyecto

api-tareas/
├── server.js
├── tareas.json
├── usuarios.json
├── package.json
├── package-lock.json

--------------------------------------------------------------------------------------------------------------------------------------------

Instalación y uso

1️.- Clonar el repositorio
git clone https://github.com/TU-USUARIO/api-tareas.git
cd api-tareas

2️.- Instalar dependencias
npm install

3️.- Ejecutar el servidor
node server.js
El servidor correrá en:

http://localhost:3000
- Endpoints disponibles
- Tareas
- Obtener todas las tareas
- GET /tareas
- Crear una tarea
- POST /tareas

Body:

{
  "titulo": "Mi tarea",
  "descripcion": "Descripción de la tarea"
}

--------------------------------------------------------------------------------------------------------------------------------------------

Actualizar una tarea

PUT /tareas/:id

--------------------------------------------------------------------------------------------------------------------------------------------

Eliminar una tarea

DELETE /tareas/:id

--------------------------------------------------------------------------------------------------------------------------------------------

Autenticación

Registrar usuario
POST /register

Body:

{
  "usuario": "ricardo",
  "password": "123456"
}

--------------------------------------------------------------------------------------------------------------------------------------------

Iniciar sesión
POST /login

Respuesta:

{
  "token": "..."
}

--------------------------------------------------------------------------------------------------------------------------------------------

Autenticación con JWT

La API utiliza tokens JWT para proteger rutas.
El token debe enviarse en los headers:

Authorization: TOKEN

--------------------------------------------------------------------------------------------------------------------------------------------

Persistencia de datos

Los datos se almacenan en archivos JSON:

tareas.json → tareas

usuarios.json → usuarios

--------------------------------------------------------------------------------------------------------------------------------------------

Conceptos implementados

- API REST

- CRUD (Create, Read, Update, Delete)

- Middleware en Express

- Manejo de errores

- Lectura y escritura de archivos

- Autenticación con JWT

- Encriptación de contraseñas

--------------------------------------------------------------------------------------------------------------------------------------------

 Notas

- No se incluye node_modules en el repositorio

- El proyecto es educativo y no está optimizado para producción.

--------------------------------------------------------------------------------------------------------------------------------------------

Desarrollado por x-numbers

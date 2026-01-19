# Pet Adoption API - Backend III

Este proyecto consiste en una API de adopción de mascotas completamente dockerizada. Implementa una arquitectura de microservicios con **Node.js** y **MongoDB**, incluyendo un sistema de generación de datos (Mocks) y carga automática de datos iniciales (Seeding).

Se armo un modulo Mocking para generar Users y Pets tanto por separados como en conjunto
Se creo mocks.services.js se encarga de crear los usuarios y las mascotas
Se creo mocks.utils en donde se utiliza la libreria faker para crear usuarios al azar teniendo por delante el modelo de users para mongo. Lo mismo para pets
Se creo mocks.controller para crear las funciones que levantar los datos y crea los usuarios y mascotas y grabarlas en las base de datos
Se creo mocks.router en donde estan los distintos endpoints para gestionar los usuarios y mascotas
get /users lista los usuarios
get /mockingUsers crea los usuarios se le pasa por query la cantidad de usuarios que se desean crear
get /pets lista las mascotas
get /mockingPets crea las mascotas se le pasa por query la cantidad de mascotas que ¿se desean crear
post /generaData genera las cantidades de usuarios y mascotas que se desean crear pasandole por query la cantidad para cada grupo

## Docker Hub

La imagen oficial de la aplicación se encuentra disponible en:
**Link:** [https://hub.docker.com/r/exaunicen/backend-3-76870]

## Instrucciones de Ejecución

Para levantar el ecosistema completo (Aplicación + Base de Datos), seguir estos pasos:

1. **Clonar el repositorio.**
2. **Archivo de configuración:** Asegúrarse de tener el archivo `.env` en la raíz con las siguientes variables:

```env
PORT=8080
MONGO_URI=mongodb://mongodb:27017/petsdb
```

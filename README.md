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

# Documentación de la API

La API cuenta con documentación interactiva generada con Swagger. Puedes explorar los endpoints, ver los modelos de datos y realizar peticiones directamente desde el navegador.

- **Swagger UI:** [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

![Swagger UI Screenshot](./src/public/img/Screenshot_5.png)

# Estructura del Test

## Configuración Previa (beforeAll):

Dado que una adopción requiere un usuario y una mascota existentes, el test crea dinámicamente estos recursos antes de iniciar las pruebas.

Se almacenan los IDs generados (createdUserId, createdPetId) para ser utilizados en los endpoints de adopción.

Casos de Éxito :

POST /api/adoptions/:uid/:pid: Valida la creación de un vínculo de adopción. Se verifica que el status sea 200 y que la respuesta contenga el ID de la nueva adopción.

GET /api/adoptions: Comprueba que el listado de adopciones funcione correctamente y que los campos owner (dueño) y pet (mascota) estén presentes, validando la lógica de Populate de Mongoose.

GET /api/adoptions/:aid: Verifica la recuperación de una adopción específica mediante su ID único.

Casos Negativos (Manejo de Errores):

Se validan escenarios donde los recursos no existen (ID de usuario o mascota inexistentes), esperando respuestas de error controladas (Status 404). Esto asegura que la API no falle ante datos inválidos.

Limpieza (afterAll):

Se asegura el cierre de la conexión a la base de datos de MongoDB para evitar fugas de memoria y permitir que el proceso de Jest finalice correctamente.

Herramientas Utilizadas
Supertest: Para simular peticiones HTTP al servidor sin necesidad de levantarlo manualmente.

Jest: Framework de testing para la ejecución y validación de aserciones.

Mongoose: Para gestionar la persistencia y conexión con la base de datos de pruebas.

# Docker Hub

Para garantizar que la aplicación funcione de la misma manera en cualquier entorno (desarrollo, testing o producción), se ha creado una imagen de Docker.

## Proceso de Construcción

Para simplificar la configuración y el despliegue, el proyecto utiliza Docker Compose. Esto permite levantar tanto la API como la base de datos MongoDB con un único comando, sin necesidad de construir las imágenes manualmente por separado.

## Imagen en Docker Hub

docker-compose.yml se encarga de levantar los servicios necesarios para la aplicación: la API y la base de datos MongoDB.

utilizamos el comando `docker-compose up -d --build` para construir y levantar los contenedores definidos en el archivo docker-compose.yml.

La imagen oficial de la aplicación se encuentra disponible en:
**Link:** [https://hub.docker.com/repository/docker/exaunicen/backend-3-76870/tags]

La imagen de este proyecto ha sido publicada en Docker Hub, lo que permite desplegar la aplicación en cualquier entorno sin necesidad de tener el código fuente localmente.

Repositorio: exaunicen/backend-3-76870

Etiqueta (Tag): latest

## Instrucciones de Ejecución

Para levantar el ecosistema completo (Aplicación + Base de Datos), seguir estos pasos:

1. **Clonar el repositorio.**
2. **Archivo de configuración:** Asegúrarse de tener el archivo `.env` en la raíz con las siguientes variables:

```env
# Conexión para Docker (usando el nombre del servicio)
MONGO_URL=mongodb://admin:password123@mongodb:27017/petsdb?authSource=admin
PORT=8080
JWT_SECRET=Bariloche2023
```

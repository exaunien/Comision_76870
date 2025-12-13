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

  

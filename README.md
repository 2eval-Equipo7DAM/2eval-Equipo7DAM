# Proyecto Backend y Frontend

Este proyecto es una aplicación fullstack que incluye un backend desarrollado con Node.js y Express, y un frontend. A continuación, se detallan los pasos para instalar, ejecutar y probar ambos componentes.

---

## Requisitos previos

- **Node.js**: versión 16 o superior.
- **npm**: gestor de paquetes de Node.js.
- **Git**: para clonar el repositorio (opcional).

--- 

## Estructura del proyecto

- **Backend**: Implementado con Node.js y Express. El archivo principal es `app.js`.
- **Frontend**: Configurado con un gestor de paquetes npm, la página principal es `index.html`.

- **Capas**: El backend está dividido en capas, route, controller y service:
- **Capa route**: Se encarga de manejar las rutas de la aplicación. Es el punto de entrada para las solicitudes HTTP y actúa como intermediario entre el cliente y las capas más internas del backend, como los controladores (controller) y los servicios (service).

- **Capa controller**: La capa controller se encarga de manejar la lógica de las solicitudes HTTP que llegan desde la capa route. Es responsable de procesar las solicitudes, interactuar con la capa de servicios (service) y devolver una respuesta al cliente.

- **Capa service**: La capa service se encarga de implementar la lógica de negocio de la aplicación. Es el núcleo donde se realizan las operaciones más importantes, como el procesamiento de datos, la interacción con la base de datos o la ejecución de reglas específicas del negocio.

---

## Tests de integración y tests unitarios

- **Tests unitarios**: Son pruebas automatizadas que se usan para verificar el correcto funcionamiento de manera aislada, en este caso, lanzamos test unitarios para comprobar que todos los campos de la tabla queden rellenados y ninguno se quede vacío. Se lanzan de manera individual con: **npm run unit-test**

- **Tests de integración**: Los tests de integración son un tipo de prueba automatizada que verifica cómo interactúan entre sí diferentes módulos o componentes de la aplicación. Se centran en comprobar que las partes del sistema funcionan correctamente cuando se combinan. Se lanzan con: **npm run integration-test**

- **Se pueden lanzar ambos tests en la misma línea con**: npm test

## Instalación

Para la instalación, bastará con situarse en ambas carpetas (backend, frontend) y ejecutar **npm install** de primeras, el siguiente paso será ejecutar un **npm start** en ambos directorios y la aplicación ya estará corriendo.

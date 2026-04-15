# Proyecto Sanos y Salvos APP

## 1. ¿Qué es y por qué nace "Sanos y Salvos"?

El extravío de animales de compañía es una problemática con un alto impacto emocional y comunitario. Actualmente, los métodos de búsqueda dependen de acciones fragmentadas, como carteles físicos o publicaciones aisladas en redes sociales. Esto genera "silos de datos" desestructurados y obliga a los usuarios a realizar búsquedas manuales constantes en flujos de información ineficientes. Además, la falta de validación geoespacial provoca que muchas coincidencias pasen desapercibidas.
Ante esta necesidad nace "Sanos y Salvos", una plataforma diseñada para centralizar y automatizar la búsqueda de mascotas extraviadas. Su objetivo es cruzar variables espaciales y descriptivas automáticamente mediante procesamiento asíncrono, notificando posibles coincidencias en tiempo real a los dueños sin requerir su intervención constante.
---

## 2. Arquitectura de Microservicios

El diseño del sistema abandona el paradigma monolítico para implementar una Arquitectura Orientada a Microservicios. Las decisiones clave de arquitectura incluyen:
 - API Gateway: Funciona como punto único de entrada, centralizando la seguridad (validación de tokens JWT) y ocultando la complejidad del backend al Frontend.
 - Arquitectura Orientada a Eventos: Se utiliza un Event Bus (RabbitMQ o Kafka) para lograr alta concurrencia y desacoplamiento. Por ejemplo, al encontrar un "match", se publica un evento de forma asíncrona.
 - Patrón Circuit Breaker: Implementado en el Motor de Coincidencias para evitar que el ecosistema completo colapse en caso de sobrecargas al realizar búsquedas pesadas.
 - Patrón Factory Method: Aplicado en el Servicio de Notificaciones para instanciar dinámicamente canales de envío como Email, SMS, WhatsApp o Telegram.
---

## 3. Modelo de Datos

Para garantizar el bajo acoplamiento y el aislamiento de dominios, el proyecto emplea el patrón Database per Service. La información no se centraliza, sino que se distribuye en las siguientes bases de datos independientes:
 - Microservicio de Autenticación: Gestiona la identidad, roles y el cifrado de credenciales.
 - Microservicio de Gestión de Reportes: Estructura los datos de la mascota (especie, raza), contacto directo y ubicación estandarizada.
 - Microservicio de Coincidencias: Almacena el historial de búsquedas y emparejamientos con su respectivo puntaje de probabilidad.
 - Microservicio de Notificaciones: Registra plantillas y hace seguimiento del estado de entrega de los mensajes.
 - Microservicio de Geolocalización: Contiene coordenadas separadas para optimizar índices avanzados y consultas espaciales sin bloqueos.
 - Microservicio de Storage: Guarda únicamente punteros lógicos (URLs) hacia servicios en la nube (S3), evitando degradar el rendimiento de la base relacional transaccional.
---

## 4. Procesos de Desarrollo, Pruebas y Despliegue

La plataforma se construye separando lógicamente las vistas del cliente (Frontend) y los servicios de procesamiento (Backend).
 - Integración y Despliegue (CI/CD): Cada microservicio será contenerizado utilizando Docker para asegurar su independencia y escalabilidad.
 - Pruebas Unitarias: Se validará la lógica pura del negocio (algoritmos del Motor de Coincidencias y Notificaciones) utilizando Mocks.
 - Pruebas de Integración: Automatizadas para comprobar la publicación en el Event Bus y la correcta persistencia de datos.
 - Pruebas E2E (End-to-End): Se emplearán herramientas como Playwright para simular el flujo completo del cliente, desde el login hasta la creación de un reporte.
 - Calidad y Rendimiento: SonarQube analizará la calidad del código mediante el pipeline, y JMeter ejecutará pruebas de performance.
---

## 5. Información del Equipo

- Desarrolladores: Rodrigo Baeza y Sibel Torti
- Asignatura: Desarrollo Fullstack III (DSY1106-003V) 
- Institución: Duoc UC, Sede Valparaíso 
- Docente: Brayan Vicente Soto Astudillo

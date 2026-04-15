# Sanos y Salvos APP

Plataforma integral diseñada para centralizar y automatizar la búsqueda de mascotas extraviadas. A diferencia de las soluciones tradicionales basadas en búsquedas manuales, *Sanos y Salvos* cruza variables espaciales y descriptivas de manera asíncrona, notificando posibles coincidencias en tiempo real a los dueños.

---

## Arquitectura del Sistema

El proyecto abandona el paradigma monolítico para adoptar una **Arquitectura Orientada a Microservicios** y una **Arquitectura Orientada a Eventos (Event-Driven)**. 

### Principales Patrones y Decisiones Arquitectónicas:
 **API Gateway (BFF):** Punto único de entrada que centraliza la seguridad y enruta las peticiones del Frontend.
 **Database per Service:** Cada microservicio gestiona su propia base de datos (PostgreSQL), garantizando el bajo acoplamiento y aislamiento funcional.
 **Comunicación Asíncrona:** Implementación de un Event Bus (RabbitMQ o Kafka) para la publicación y consumo de eventos (ej. `CoincidenciaPotencialEncontrada`).
 **Circuit Breaker:** Implementado en el Motor de Coincidencias para prevenir fallos en cascada ante procesos de alta carga computacional.
 **Factory Method:** Utilizado en el servicio de notificaciones para instanciar dinámicamente el canal de envío (Email, SMS, WhatsApp, Telegram).

---

## Estructura del Repositorio

El proyecto se organiza bajo un enfoque que separa lógicamente el cliente del servidor:

```text
sanos-y-salvos/
├── frontend/                 # Aplicación cliente (SPA)
│   ├── src/                  # Componentes, vistas (Login, Dashboard, Formulario)
│   └── package.json
└── backend/                  # API Gateway y Microservicios
    ├── api-gateway/          # Enrutamiento y validación JWT
    ├── ms-autenticacion/     # Gestión de identidades, roles y JWT (bcrypt/Argon2)
    ├── ms-reportes/          # Creación y gestión de reportes de mascotas
    ├── ms-coincidencias/     # Motor de cruce de datos y cálculo de probabilidades
    ├── ms-notificaciones/    # Integración omnicanal de alertas
    ├── ms-geolocalizacion/   # Consultas espaciales e índices para mapas de calor
    └── ms-storage/           # Subida de imágenes a AWS S3 (Punteros lógicos)

---

## Tecnologías (Stack Propuesto)
Frontend: React / Angular / Vue (Manejo de estado global, Axios/Fetch)

Backend: Node.js (Express/NestJS) o Java (Spring Boot)

Base de Datos: PostgreSQL (Instancias separadas por servicio)

Mensajería: RabbitMQ / Apache Kafka

Almacenamiento: Amazon S3 (o LocalStack para desarrollo)

Contenedores: Docker y Docker Compose

Calidad de Código y Testing: SonarQube, Playwright (E2E), Jest/JUnit.

---

## Instalación y Configuración Local
Clonar el repositorio:

Bash
git clone [https://github.com/tu-usuario/sanos-y-salvos.git](https://github.com/tu-usuario/sanos-y-salvos.git)
cd sanos-y-salvos
Levantar los servicios base (BBDD y Event Bus):
Asegúrate de tener Docker instalado y ejecuta en la raíz del backend:

Bash
docker-compose up -d
Esto levantará las bases de datos PostgreSQL y el servidor RabbitMQ/Kafka.

Configurar Variables de Entorno:
Copia el archivo .env.example a .env en cada microservicio y en el frontend, ajustando las credenciales de la base de datos y claves JWT.

Inicializar Backend:
Entra a cada microservicio, instala las dependencias e inicia el servidor de desarrollo. (Ejemplo con Node.js):

Bash
cd backend/ms-autenticacion
npm install
npm run dev
Inicializar Frontend:

Bash
cd frontend
npm install
npm run dev

---

## Pruebas (QA)
El proyecto cuenta con una pirámide de pruebas automatizadas:

Unitarias: Validación de lógica pura (ej. cálculos del Motor de Coincidencias) usando Mocks.

Integración: Pruebas de persistencia en BD y flujo de mensajes en el Event Bus.

E2E: Flujos completos de usuario (desde login hasta la notificación) automatizados con Playwright.

Performance: Pruebas de estrés y escalabilidad utilizando JMeter.

---
## Equipo de Desarrollo
Integrantes: Rodrigo Baeza y Sibel Torti

Asignatura: Desarrollo Fullstack III (DSY1106-003V)

Institución: Duoc UC, Sede Valparaíso

Docente: Prof. Brayan Vicente Soto Astudillo
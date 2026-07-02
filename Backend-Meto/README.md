# Backend - Proyecto METO

Backend desarrollado en Node.js con Express, Sequelize y PostgreSQL.

---

## Requisitos previos

- Node.js instalado
- PostgreSQL instalado y corriendo

---

## Instalación

```bash
npm install
```

## Configuración

Crea el archivo `.env` en la raíz del proyecto:
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=backend_meto
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DEFAULT_ADMIN_NAME=Administrador
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=admin123
JWT_SECRET=clave_secreta_jwt

Crea la base de datos en PostgreSQL:

```sql
CREATE DATABASE backend_meto;
```

## Inicializar tablas y datos base

```bash
npm run setup
```

## Levantar el servidor

```bash
npm run dev
```

El servidor corre en `http://localhost:3000`

---

## Verificar que funciona
GET http://localhost:3000/health

---

## Endpoints disponibles

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| POST | `/api/auth/login` | Público | Iniciar sesión |
| GET | `/api/auth/me` | Token | Usuario actual |
| POST | `/api/donaciones` | Público | Registrar donación |
| GET | `/api/donaciones` | Admin | Ver historial |
| PATCH | `/api/donaciones/:id` | Admin | Cambiar estado |
| GET | `/api/voluntarios` | Público | Listar voluntarios |
| POST | `/api/familias` | Token | Crear familia |
| GET | `/api/actividades` | Token | Listar actividades |

---

## Estructura del proyecto
src/
config/        → configuración de base de datos y entorno
controllers/   → reciben peticiones y responden
entities/      → modelos de la base de datos
handlers/      → formato estándar de respuestas
middlewares/   → autenticación y roles
routes/        → definición de URLs
services/      → lógica de negocio
validations/   → validación de datos de entrada

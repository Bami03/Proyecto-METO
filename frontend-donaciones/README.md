# Frontend - Gestión de Donaciones
## Proyecto METO

Frontend desarrollado en React para el módulo de gestión de donaciones.

---

## Requisitos previos

- Node.js instalado
- Backend corriendo en `http://localhost:3000`

---

## Instalación

```bash
npm install
```

## Iniciar el proyecto

```bash
npm start
```

El frontend se abre en `http://localhost:3001`

---

## Páginas disponibles

| Ruta | Descripción |
|------|-------------|
| `http://localhost:3001` | Formulario de donación (público) |
| `http://localhost:3001/admin` | Panel del administrador (requiere login) |


---

## Funcionalidades

- Registro de donación anónima o registrada
- Validación de campos (RUT, nombre, correo, monto)
- Adjuntar comprobante de transferencia (JPG, PNG, PDF)
- Panel admin para ver historial y validar o rechazar donaciones

---

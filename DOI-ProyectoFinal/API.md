# API Reference - DOI Radiología

Documentación de endpoints disponibles para la aplicación React Native.

## Base URL

**Backend (Next.js):** `https://your-domain.com/api`
**Local:** `http://localhost:3000/api`

## Autenticación

Todos los endpoints protegidos requieren un token JWT válido en el header:

\`\`\`http
Authorization: Bearer {jwt_token}
\`\`\`

---

## Endpoints

### 1. Solicitar Turno

Crear nueva solicitud de turno (público, no requiere autenticación).

**Endpoint:** `POST /appointments/request`

**Body:**
\`\`\`json
{
  "submission_id": "string (único)",
  "patient_nombre": "string (min 2 chars)",
  "patient_apellido": "string (min 2 chars)",
  "patient_dni": "string (8 dígitos)",
  "patient_email": "string (email válido)",
  "tipo_estudio": "string",
  "fecha_turno": "string (ISO date) | null",
  "notas": "string | null"
}
\`\`\`

**Respuesta exitosa (200):**
\`\`\`json
{
  "success": true,
  "data": { /* appointment object */ }
}
\`\`\`

**Códigos de error:**
- `200` - Éxito (incluso con advertencias)

---

### 2. Cancelar Turno

Cancelar un turno existente (requiere autenticación).

**Endpoint:** `POST /appointments/cancel`

**Headers:** `Authorization: Bearer {token}`

**Body:**
\`\`\`json
{
  "appointmentId": "string (UUID)"
}
\`\`\`

**Respuesta exitosa (200):**
\`\`\`json
{
  "success": true,
  "message": "Turno cancelado correctamente"
}
\`\`\`

**Códigos de error:**
- `400` - appointmentId faltante
- `401` - No autorizado (token inválido o ausente)
- `404` - Turno no encontrado
- `500` - Error del servidor

---

### 3. Subir Imagen

Subir imagen de estudio a Vercel Blob (requiere autenticación implícita).

**Endpoint:** `POST /upload?filename={nombre_archivo}`

**Query Params:**
- `filename` (requerido) - Nombre del archivo con extensión

**Body:** `multipart/form-data`
- `file` (File) - Archivo de imagen

**Respuesta exitosa (200):**
\`\`\`json
{
  "url": "https://blob.vercel-storage.com/...",
  "pathname": "filename.jpg",
  "contentType": "image/jpeg",
  "contentDisposition": "inline; filename=\"filename.jpg\""
}
\`\`\`

**Códigos de error:**
- `400` - Filename o file faltante
- `500` - Error en upload

---

### 4. Cerrar Sesión

Cerrar sesión del usuario (requiere autenticación).

**Endpoint:** `POST /auth/signout`

**Headers:** `Authorization: Bearer {token}`

**Respuesta exitosa (200):**
\`\`\`json
{
  "success": true
}
\`\`\`

**Códigos de error:**
- `401` - No autorizado
- `500` - Error del servidor

---

## Operaciones Supabase (Cliente)

Las siguientes operaciones se realizan directamente desde el cliente React Native usando el SDK de Supabase:

### Autenticación

**Login:**
\`\`\`typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: string,
  password: string
})
\`\`\`

**Registro:**
\`\`\`typescript
const { data, error } = await supabase.auth.signUp({
  email: string,
  password: string,
  options: {
    data: {
      nombre: string,
      apellido: string,
      dni: string,
      telefono: string
    }
  }
})
\`\`\`

**Logout:**
\`\`\`typescript
await supabase.auth.signOut()
\`\`\`

### Gestión de Turnos

**Obtener turnos del cliente:**
\`\`\`typescript
const { data } = await supabase
  .from('appointments')
  .select('*')
  .eq('patient_email', userEmail)
  .order('fecha_turno', { ascending: true })
\`\`\`

**Actualizar estado de turno (empleado/admin):**
\`\`\`typescript
const { error } = await supabase
  .from('appointments')
  .update({ estado: 'confirmado' | 'completado' })
  .eq('id', appointmentId)
\`\`\`

### Gestión de Pacientes

**Crear paciente:**
\`\`\`typescript
const { data, error } = await supabase
  .from('patients')
  .insert({
    nombre: string,
    apellido: string,
    dni: string,
    email: string,
    telefono: string,
    fecha_nacimiento: string,
    is_registered: boolean
  })
\`\`\`

**Obtener pacientes:**
\`\`\`typescript
const { data } = await supabase
  .from('patients')
  .select('*')
  .order('apellido', { ascending: true })
\`\`\`

### Gestión de Estudios

**Crear estudio:**
\`\`\`typescript
const { data, error } = await supabase
  .from('studies')
  .insert({
    patient_dni: string,
    tipo_estudio: string,
    fecha_estudio: string,
    notas: string
  })
  .select()
  .single()
\`\`\`

**Agregar imágenes a estudio:**
\`\`\`typescript
const { error } = await supabase
  .from('study_images')
  .insert({
    study_id: string,
    image_url: string,
    image_name: string
  })
\`\`\`

**Obtener estudios del cliente:**
\`\`\`typescript
const { data } = await supabase
  .from('studies')
  .select(`
    *,
    study_images (*)
  `)
  .eq('patient_dni', userDNI)
  .order('fecha_estudio', { ascending: false })
\`\`\`

---

## Códigos de Estado HTTP

- `200` - Éxito
- `400` - Bad Request (parámetros inválidos)
- `401` - No autorizado (token inválido/ausente)
- `403` - Prohibido (sin permisos)
- `404` - No encontrado
- `409` - Conflicto (ej: DNI duplicado)
- `422` - Validación fallida
- `500` - Error del servidor

---

## Mensajes de Error

Los errores siguen este formato:

\`\`\`json
{
  "error": "Mensaje descriptivo del error"
}
\`\`\`

Ejemplos:
- `"appointmentId is required"`
- `"No autorizado"`
- `"Turno no encontrado"`
- `"Error al cancelar el turno: [detalle]"`
- `"Filename is required"`
- `"File is required"`

---

## Notas de Seguridad

1. **Row Level Security (RLS):** Todas las tablas tienen políticas RLS en Supabase
2. **JWT Tokens:** Tokens con expiración de 1 hora, refresh automático
3. **Validación:** Doble validación (cliente + servidor)
4. **CORS:** Configurado para dominios permitidos
5. **Rate Limiting:** Implementado en producción

---

## Variables de Entorno Requeridas

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# Vercel Blob (para uploads)
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx

# Site URL (para emails)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Gmail (para notificaciones)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

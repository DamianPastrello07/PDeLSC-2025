# Aplicación React Native - DOI Radiología

## Descripción
Esta es una aplicación móvil completa para DOI (Diagnóstico Odontológico por Imagen) construida con React Native y Expo Router.

## Estructura del Proyecto

### Arquitectura
- **Framework**: React Native con Expo
- **Navegación**: Expo Router (file-based routing)
- **Estilos**: NativeWind (Tailwind CSS para React Native)
- **Autenticación**: Supabase Auth
- **Base de datos**: Supabase (PostgreSQL)
- **Validación de formularios**: React Hook Form + Zod
- **Gestión de estado**: Context API + AsyncStorage

### Pantallas Principales

#### Públicas (sin autenticación)
- `/` - Home/Landing page
- `/servicios` - Listado de servicios ofrecidos
- `/aseguradoras` - Obras sociales aceptadas
- `/nosotros` - Información sobre la empresa
- `/contacto` - Formulario de contacto

#### Autenticación
- `/login` - Inicio de sesión
- `/register` - Registro de nuevos usuarios
- `/complete-profile` - Completar perfil después del registro

#### Dashboard Cliente (`/cliente`)
- Ver mis turnos asignados
- Ver mis estudios radiológicos
- Cancelar turnos
- Descargar imágenes de estudios

#### Dashboard Empleado (`/empleado`)
- Gestión de turnos (asignar, confirmar, completar)
- Gestión de pacientes (registrados y no registrados)
- Carga de estudios radiológicos
- Gestión de imágenes múltiples por estudio

#### Dashboard Admin (`/admin`)
- Gestión de usuarios (cambiar roles)
- Todas las funciones de empleado
- Gestión de contenido del sitio
- Estadísticas y reportes

### Funcionalidades Implementadas

1. **Autenticación JWT con Supabase**
   - Login/Logout
   - Registro de usuarios
   - Verificación de email
   - Recuperación de contraseña
   - Persistencia de sesión con AsyncStorage
   - Refresh token automático

2. **Gestión de Turnos**
   - Solicitud de turnos (formulario de contacto)
   - Asignación de turnos por empleados
   - Estados: pendiente, confirmado, completado, cancelado
   - Notificaciones por email
   - Cancelación de turnos
   - Vista de turnos próximos e historial

3. **Gestión de Pacientes**
   - Pacientes registrados (con cuenta)
   - Pacientes no registrados (sin cuenta)
   - CRUD completo de pacientes
   - Búsqueda y filtrado
   - Validación de DNI único

4. **Gestión de Estudios**
   - Carga de estudios radiológicos
   - Múltiples imágenes por estudio
   - Tipos de estudio predefinidos
   - Asociación con pacientes por DNI
   - Visualización de estudios
   - Descarga de imágenes
   - Almacenamiento en Vercel Blob

5. **Sistema de Roles y Permisos**
   - Admin: acceso total
   - Empleado: gestión operativa
   - Cliente: solo sus datos
   - Validación en frontend y backend
   - Row Level Security (RLS) en Supabase

6. **Validación de Formularios**
   - Validación en tiempo real
   - Mensajes de error específicos
   - Schemas con Zod
   - Validaciones personalizadas:
     * Nombres y apellidos: solo letras, mínimo 2 caracteres
     * DNI: exactamente 8 dígitos numéricos
     * Teléfono: formato argentino con caracteres válidos
     * Email: formato válido
     * Fechas: no se permiten fechas futuras en estudios

7. **Manejo de Errores**
   - Try-catch en todas las operaciones
   - Alertas nativas para feedback
   - Logging para debugging
   - Rollback en operaciones fallidas
   - Mensajes amigables al usuario

8. **UI/UX Responsive**
   - Diseño mobile-first
   - Componentes adaptables
   - Navegación intuitiva
   - Indicadores de carga
   - Estados vacíos informativos
   - Confirmaciones para acciones destructivas

### Componentes Reutilizables

- `Button`: Botón personalizado con variantes
- `Input`: Campo de texto con validación
- `Card`: Contenedor de contenido
- `Badge`: Etiquetas de estado
- `Loading`: Indicador de carga
- `EmptyState`: Estado vacío con mensaje

### Servicios y Utilidades

- `lib/supabase.ts`: Cliente de Supabase configurado
- `lib/validations.ts`: Schemas de validación Zod
- `contexts/AuthContext.tsx`: Gestión de autenticación global
- `hooks/useAuth.ts`: Hook personalizado para auth

### Variables de Entorno Requeridas

\`\`\`env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### Instalación y Ejecución

\`\`\`bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios
\`\`\`

### Diferencias con Next.js Original

1. **Navegación**: Expo Router en lugar de Next.js App Router
2. **Componentes**: React Native (View, Text) en lugar de HTML (div, span)
3. **Estilos**: NativeWind en lugar de Tailwind CSS
4. **Imágenes**: expo-image-picker en lugar de file input HTML
5. **Storage**: AsyncStorage en lugar de cookies
6. **Supabase**: @supabase/supabase-js en lugar de @supabase/ssr
7. **Iconos**: lucide-react-native en lugar de lucide-react
8. **Alerts**: Alert nativo en lugar de toast notifications

### Características de Seguridad

- Autenticación JWT con tokens de acceso y refresh
- Row Level Security en base de datos
- Validación en cliente y servidor
- Sanitización de inputs
- Encriptación de contraseñas
- HTTPS obligatorio en producción
- Políticas RLS específicas por rol

### Próximas Mejoras Sugeridas

- Notificaciones push
- Modo offline
- Caché de datos
- Paginación en listados
- Búsqueda avanzada
- Filtros por fecha
- Exportación de reportes
- Chat en tiempo real
- Videollamadas
- Integración con calendarios

## Notas Técnicas

- La app utiliza Expo Managed Workflow
- Compatible con Android e iOS
- Requiere Node.js 18+
- Usa TypeScript para type safety
- Sigue las mejores prácticas de React Native
- Implementa patrones de diseño modernos
- Código modular y mantenible

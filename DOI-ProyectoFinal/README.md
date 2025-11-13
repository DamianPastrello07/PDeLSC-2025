# Radiología App - React Native

Aplicación móvil de gestión de radiología construida con React Native, Expo Router y Supabase.

## Características

- Autenticación con Supabase (email/password)
- Gestión de roles (Admin, Empleado, Cliente)
- Navegación basada en roles
- Gestión de turnos y estudios
- Gestión de pacientes
- UI responsive con NativeWind (Tailwind CSS)

## Arquitectura

### Estructura de Carpetas

\`\`\`
rn-app/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Auth screens (login, register, forgot-password)
│   ├── (tabs)/            # Role-based screens (admin, empleado, cliente)
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Entry point with role-based redirect
├── components/            # Reusable components
├── contexts/              # React contexts (AuthContext)
├── lib/                   # Utilities and configurations
│   └── supabase.ts       # Supabase client and types
├── assets/               # Images and static files
└── global.css           # Tailwind CSS styles
\`\`\`

### Tecnologías

- **React Native + Expo**: Framework móvil multiplataforma
- **Expo Router**: Navegación basada en sistema de archivos
- **Supabase**: Backend (auth, database, storage)
- **NativeWind**: Tailwind CSS para React Native
- **React Hook Form + Zod**: Validación de formularios
- **AsyncStorage**: Persistencia de sesión
- **TypeScript**: Type safety

### Autenticación

El sistema de autenticación usa Supabase Auth con las siguientes características:

- Tokens JWT almacenados en AsyncStorage
- Auto-refresh de tokens
- Context API para estado global de usuario
- Listeners de cambios de autenticación
- Redirección basada en roles

### Gestión de Estado

- **AuthContext**: Maneja sesión, usuario y operaciones de auth
- **Local State**: Cada pantalla maneja su propio estado
- **Supabase RLS**: Seguridad a nivel de base de datos

### Navegación

- **Expo Router**: Sistema de navegación basado en carpetas
- **Stack Navigation**: Para flujos de autenticación
- **Tab Navigation**: Para pantallas principales (ocultas según rol)
- **Redirecciones automáticas**: Según estado de autenticación y rol

## Instalación

1. Instalar dependencias:
\`\`\`bash
npm install
# o
yarn install
# o
pnpm install
\`\`\`

2. Configurar variables de entorno:
\`\`\`bash
cp .env.example .env
\`\`\`

Editar `.env` con tus credenciales de Supabase:
\`\`\`
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
\`\`\`

3. Iniciar el servidor de desarrollo:
\`\`\`bash
npm start
\`\`\`

4. Ejecutar en dispositivo/emulador:
\`\`\`bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
\`\`\`

## Estructura de Base de Datos

La app utiliza las siguientes tablas de Supabase:

- **profiles**: Datos de usuarios con rol
- **patients**: Información de pacientes
- **appointments**: Turnos y citas
- **studies**: Estudios radiológicos
- **study_images**: Imágenes de estudios

## Roles y Permisos

### Admin
- Gestión de usuarios
- Cambio de roles
- Acceso completo al sistema

### Empleado
- Gestión de turnos
- Gestión de pacientes
- Carga de estudios

### Cliente
- Ver turnos propios
- Ver estudios propios

## Próximas Funcionalidades

- Carga de imágenes de estudios con expo-image-picker
- Notificaciones push
- Modo offline
- Exportación de estudios a PDF
- Chat con empleados
- Calendario interactivo

## Notas de Desarrollo

- Las políticas RLS de Supabase deben estar configuradas
- Se requiere configurar deep linking para recuperación de contraseña
- Las imágenes se almacenan en Supabase Storage
- NativeWind requiere configuración específica de Tailwind

## Testing

\`\`\`bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch
\`\`\`

## Build Production

\`\`\`bash
# iOS
eas build --platform ios

# Android
eas build --platform android
\`\`\`

## Soporte

Para problemas o preguntas, contactar al equipo de desarrollo.

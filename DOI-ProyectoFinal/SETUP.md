# Guía de Instalación - DOI Radiología

Instrucciones para configurar el entorno de desarrollo completo.

---

## Requisitos Previos

- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **npm**, **yarn** o **pnpm**
- **Git**
- **Expo CLI** (se instala automáticamente)
- **Android Studio** (para emulador Android) o **Xcode** (para iOS en Mac)
- **Cuenta de Supabase** ([supabase.com](https://supabase.com))
- **Cuenta de Vercel** (opcional, para deployment)

---

## 1. Backend (Next.js) - Proyecto Original

### Instalación

\`\`\`bash
# Clonar repositorio
git clone <repository-url>
cd <project-folder>

# Instalar dependencias
npm install
\`\`\`

### Variables de Entorno

Crear archivo `.env.local` en la raíz:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Vercel Blob (para imágenes)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx

# Gmail (notificaciones email)
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### Base de Datos (Supabase)

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ejecutar scripts SQL en el editor de Supabase (orden importante):

\`\`\`bash
# En el SQL Editor de Supabase, ejecutar en orden:
scripts/001_create_profiles_table.sql
scripts/002_create_patients_table.sql
scripts/003_create_appointments_table.sql
scripts/004_create_studies_table.sql
scripts/005_create_study_images_table.sql
scripts/006_setup_rls_policies.sql
# ... (ejecutar todos los scripts en orden)
\`\`\`

3. Habilitar **Row Level Security (RLS)** en todas las tablas desde el dashboard de Supabase

### Ejecutar Backend

\`\`\`bash
# Modo desarrollo
npm run dev

# Build para producción
npm run build
npm start
\`\`\`

El backend estará en `http://localhost:3000`

---

## 2. Frontend (React Native)

### Instalación

\`\`\`bash
# Navegar a carpeta de React Native
cd rn-app

# Instalar dependencias
npm install
\`\`\`

### Variables de Entorno

Crear archivo `.env` en `rn-app/`:

\`\`\`env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
EXPO_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

**Nota:** Para Android emulator, usar `http://10.0.2.2:3000/api` en lugar de `localhost`

### Configuración de Expo

\`\`\`bash
# Login a Expo (opcional, recomendado)
npx expo login

# Instalar Expo Go en tu dispositivo móvil
# Android: Google Play Store
# iOS: App Store
\`\`\`

### Ejecutar App

\`\`\`bash
# Iniciar servidor de desarrollo
npm start

# O directamente en plataforma específica:
npm run android  # Android
npm run ios      # iOS (solo Mac)
npm run web      # Web browser
\`\`\`

Escanea el QR con **Expo Go** desde tu móvil.

---

## 3. Configuración Adicional

### Vercel Blob (Storage de Imágenes)

1. Crear proyecto en [vercel.com](https://vercel.com)
2. Ir a **Storage** → **Create Database** → **Blob**
3. Copiar `BLOB_READ_WRITE_TOKEN` a `.env.local`

### Gmail (Notificaciones Email)

1. Habilitar verificación en 2 pasos en tu cuenta de Gmail
2. Generar **App Password**: [Guía oficial](https://support.google.com/accounts/answer/185833)
3. Usar el password generado en `GMAIL_APP_PASSWORD`

### Android Emulator

\`\`\`bash
# Instalar Android Studio
# Crear AVD (Android Virtual Device) desde AVD Manager
# Iniciar emulador y luego:
npm run android
\`\`\`

### iOS Simulator (solo Mac)

\`\`\`bash
# Instalar Xcode desde App Store
# Instalar Command Line Tools:
xcode-select --install

# Ejecutar:
npm run ios
\`\`\`

---

## 4. Verificación de Setup

### Checklist Backend

- [ ] `npm run dev` ejecuta sin errores
- [ ] `http://localhost:3000` muestra la landing page
- [ ] Login funciona en `http://localhost:3000/login`
- [ ] Dashboard admin/empleado/cliente es accesible según rol

### Checklist Frontend

- [ ] `npm start` ejecuta sin errores
- [ ] App se abre en Expo Go en móvil
- [ ] Login funciona en la app móvil
- [ ] Navegación entre tabs funciona
- [ ] Se pueden ver/crear turnos

### Checklist Base de Datos

- [ ] Todas las tablas están creadas
- [ ] RLS está habilitado
- [ ] Políticas RLS están activas
- [ ] Función `get_user_role()` existe

---

## 5. Troubleshooting

### Error: "Supabase client is not authorized"
- Verificar que las credenciales en `.env` sean correctas
- Confirmar que RLS está configurado correctamente

### Error: "Network request failed"
- Android emulator: usar `http://10.0.2.2:3000` en lugar de `localhost`
- Verificar que el backend esté corriendo
- Revisar que no haya firewall bloqueando

### Error: "Unable to resolve module"
- Limpiar caché: `npm start -- --clear`
- Reinstalar: `rm -rf node_modules && npm install`

### App se cierra al abrir
- Ver logs: `npx expo start --dev-client`
- Verificar que todas las dependencias estén instaladas
- Revisar variables de entorno

---

## 6. Estructura de Archivos

\`\`\`
project/
├── app/                    # Next.js App Router (backend)
├── components/             # Componentes Next.js
├── lib/                    # Utilidades Next.js
├── scripts/                # SQL scripts
├── rn-app/                 # React Native app
│   ├── app/               # Expo Router screens
│   ├── components/        # Componentes RN
│   ├── contexts/          # Context providers
│   ├── lib/               # Utilidades RN
│   └── .env               # Variables RN
├── .env.local             # Variables backend
└── package.json           # Deps backend
\`\`\`

---

## 7. Comandos Útiles

\`\`\`bash
# Backend
npm run dev          # Desarrollo
npm run build        # Build producción
npm run lint         # Linting

# Frontend
npm start            # Desarrollo
npm run android      # Android
npm run ios          # iOS
npm test             # Tests
npx expo prebuild    # Generate native folders

# Base de datos
# Ejecutar en Supabase SQL Editor
\`\`\`

---

## 8. Deployment

### Backend (Vercel)

\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variables de entorno en dashboard de Vercel
\`\`\`

### Frontend (EAS Build)

\`\`\`bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar proyecto
eas build:configure

# Build para Android
eas build --platform android

# Build para iOS (requiere cuenta de Apple Developer)
eas build --platform ios
\`\`\`

---

## Soporte

Para problemas o consultas, revisar:
- `API_REFERENCE.md` - Documentación de API
- `ARCHITECTURE.md` - Arquitectura del proyecto
- `docs/` - Documentación técnica detallada

**Contacto:** Equipo de desarrollo DOI Radiología

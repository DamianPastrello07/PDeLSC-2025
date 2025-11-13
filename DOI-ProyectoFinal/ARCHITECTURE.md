# Arquitectura de la Aplicación React Native

## Descripción General
Esta aplicación React Native utiliza Expo Router para navegación, Supabase para backend y autenticación, y NativeWind para estilos con Tailwind CSS.

## Estructura del Proyecto

\`\`\`
rn-app/
├── app/                          # Rutas de la aplicación (Expo Router)
│   ├── _layout.tsx              # Layout principal con AuthProvider
│   ├── index.tsx                # Pantalla de entrada/splash
│   ├── (auth)/                  # Grupo de rutas de autenticación
│   │   ├── _layout.tsx         # Layout para auth screens
│   │   ├── login.tsx           # Pantalla de login
│   │   ├── register.tsx        # Pantalla de registro
│   │   └── forgot-password.tsx # Recuperación de contraseña
│   ├── (tabs)/                  # Navegación por tabs (público)
│   │   ├── _layout.tsx         # Tab navigator
│   │   ├── home.tsx            # Home/Landing
│   │   ├── servicios.tsx       # Servicios
│   │   ├── aseguradoras.tsx    # Aseguradoras
│   │   ├── nosotros.tsx        # Nosotros
│   │   └── contacto.tsx        # Contacto
│   ├── (dashboard)/             # Rutas protegidas por rol
│   │   ├── admin.tsx           # Dashboard admin
│   │   ├── empleado.tsx        # Dashboard empleado
│   │   └── cliente.tsx         # Dashboard cliente
│   └── +not-found.tsx          # Pantalla 404
│
├── components/                   # Componentes reutilizables
│   ├── ui/                      # Componentes UI básicos
│   │   ├── Button.tsx          # Botón con variantes
│   │   ├── Input.tsx           # Input con validación
│   │   └── ...
│   ├── admin/                   # Componentes del admin
│   │   └── UsersManagement.tsx
│   ├── empleado/                # Componentes del empleado
│   │   ├── AppointmentsManagement.tsx
│   │   ├── PatientsManagement.tsx
│   │   └── UploadStudies.tsx
│   └── cliente/                 # Componentes del cliente
│       ├── ViewAppointments.tsx
│       └── ViewStudies.tsx
│
├── contexts/                     # Context providers
│   └── AuthContext.tsx          # Autenticación y usuario
│
├── lib/                          # Utilidades y configuración
│   ├── supabase.ts              # Cliente Supabase y OAuth
│   ├── api.ts                   # Cliente API REST con interceptores
│   └── validations.ts           # Schemas de validación Zod
│
├── hooks/                        # Custom hooks
│   ├── useToast.ts              # Sistema de notificaciones
│   └── ...
│
├── package.json                  # Dependencias
├── app.json                      # Configuración de Expo
├── tailwind.config.js           # Configuración de Tailwind
└── tsconfig.json                # Configuración de TypeScript
\`\`\`

## Flujo de Autenticación

### 1. Autenticación JWT con Supabase

\`\`\`typescript
// lib/supabase.ts
export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage,        // Persistencia local
    autoRefreshToken: true,        // Refresh automático
    persistSession: true,          // Sesión persistente
    detectSessionInUrl: false,     // No detectar en URL (RN)
  },
})
\`\`\`

### 2. AuthContext (Estado Global)

\`\`\`typescript
// contexts/AuthContext.tsx
export function AuthProvider({ children }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) storeTokens(session) // Guardar en AsyncStorage
    })

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "TOKEN_REFRESHED") {
          storeTokens(session) // Actualizar tokens
        }
        // ... actualizar estado
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{
      session, user, signIn, signOut, signInWithGoogle, signInWithFacebook
    }}>
      {children}
    </AuthContext.Provider>
  )
}
\`\`\`

### 3. Autenticación Social (OAuth)

\`\`\`typescript
// Google OAuth
export const googleAuth = {
  async signIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo, skipBrowserRedirect: true }
    })
    
    if (data?.url) {
      // Abrir navegador OAuth
      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo)
      
      if (result.type === "success") {
        // Extraer tokens de la URL de callback
        const params = new URL(result.url).searchParams
        const accessToken = params.get("access_token")
        const refreshToken = params.get("refresh_token")
        
        // Establecer sesión con tokens
        await supabase.auth.setSession({ access_token, refresh_token })
      }
    }
  }
}
\`\`\`

### 4. Renovación de Tokens

**Automática (Supabase):**
- Supabase maneja el refresh automáticamente
- `autoRefreshToken: true` renueva antes de expirar
- `onAuthStateChange` detecta evento "TOKEN_REFRESHED"

**Manual (API Custom):**
\`\`\`typescript
// lib/api.ts
private async refreshAccessToken(): Promise<string> {
  const refreshToken = await AsyncStorage.getItem("refresh_token")
  
  const response = await axios.post("/auth/refresh", {
    refresh_token: refreshToken
  })
  
  const { access_token, refresh_token: newRefreshToken } = response.data
  
  await AsyncStorage.multiSet([
    ["access_token", access_token],
    ["refresh_token", newRefreshToken]
  ])
  
  return access_token
}
\`\`\`

## Cliente API REST con Manejo de Errores

### 1. Interceptores de Request

\`\`\`typescript
// lib/api.ts - Request Interceptor
this.client.interceptors.request.use(
  async (config) => {
    // Verificar conectividad
    const netInfo = await NetInfo.fetch()
    if (!netInfo.isConnected) {
      throw new APIError("No hay conexión a Internet", 0, "NO_NETWORK")
    }

    // Agregar token de autorización
    const token = await AsyncStorage.getItem("access_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
)
\`\`\`

### 2. Interceptores de Response

\`\`\`typescript
// lib/api.ts - Response Interceptor
this.client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Manejar 401 - Token expirado
    if (error.response?.status === 401) {
      try {
        // Renovar token
        const newToken = await this.refreshAccessToken()
        
        // Reintentar request original
        error.config.headers.Authorization = `Bearer ${newToken}`
        return this.client.request(error.config)
      } catch (refreshError) {
        // Falló el refresh, cerrar sesión
        await this.handleAuthFailure()
        throw new APIError("Sesión expirada", 401, "SESSION_EXPIRED")
      }
    }

    return Promise.reject(this.handleError(error))
  }
)
\`\`\`

### 3. Manejo de Errores por Código HTTP

\`\`\`typescript
// lib/api.ts - Error Handler
private handleError(error: AxiosError): APIError {
  if (error.response) {
    const statusCode = error.response.status
    const message = error.response.data?.error

    switch (statusCode) {
      case 400:
        return new APIError(message || "Datos inválidos", 400, "BAD_REQUEST")
      case 401:
        return new APIError("No autorizado", 401, "UNAUTHORIZED")
      case 403:
        return new APIError("Sin permisos", 403, "FORBIDDEN")
      case 404:
        return new APIError("Recurso no encontrado", 404, "NOT_FOUND")
      case 500:
        return new APIError("Error del servidor", 500, "INTERNAL_ERROR")
      // ... más casos
    }
  } else if (error.request) {
    // Sin respuesta del servidor
    return new APIError("Error de conexión", 0, "NETWORK_ERROR")
  } else {
    // Error al configurar request
    return new APIError(error.message, 0, "REQUEST_ERROR")
  }
}
\`\`\`

### 4. Retry Logic

\`\`\`typescript
// lib/api.ts - Retry Logic
private async request<T>(config: AxiosRequestConfig, retries = 3) {
  try {
    const response = await this.client.request(config)
    return response.data
  } catch (error) {
    // Reintentar solo en errores de red
    if (retries > 0 && error.code === "NETWORK_ERROR") {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1s
      return this.request<T>(config, retries - 1)
    }
    throw error
  }
}
\`\`\`

## Sistema de Roles y Permisos

### 1. Protección de Rutas (Middleware)

\`\`\`typescript
// app/_layout.tsx
export default function RootLayout() {
  const { user, loading } = useAuth()
  const segments = useSegments()

  useEffect(() => {
    if (loading) return

    const inAuth = segments[0] === "(auth)"
    const inDashboard = segments[0] === "(dashboard)"

    // Redirigir a login si no autenticado y en ruta protegida
    if (!user && inDashboard) {
      router.replace("/(auth)/login")
    }

    // Redirigir al dashboard según rol
    if (user && inAuth) {
      if (user.role === "admin") router.replace("/(dashboard)/admin")
      else if (user.role === "empleado") router.replace("/(dashboard)/empleado")
      else router.replace("/(dashboard)/cliente")
    }
  }, [user, loading, segments])

  return <Slot />
}
\`\`\`

### 2. Validación por Rol en Componentes

\`\`\`typescript
// app/(dashboard)/admin.tsx
export default function AdminDashboard() {
  const { user } = useAuth()

  if (user?.role !== "admin") {
    return <Redirect href="/(dashboard)/cliente" />
  }

  return <AdminContent />
}
\`\`\`

### 3. Row Level Security (RLS) en Base de Datos

\`\`\`sql
-- Política: Solo administradores pueden ver todos los usuarios
CREATE POLICY "profiles_select_admin"
  ON profiles FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');

-- Política: Clientes solo ven sus propios turnos
CREATE POLICY "appointments_select_client"
  ON appointments FOR SELECT
  USING (
    patient_email IN (
      SELECT email FROM profiles WHERE id = auth.uid()
    )
  );

-- Función helper para obtener rol
CREATE FUNCTION get_user_role(user_id uuid)
RETURNS text
SECURITY DEFINER
AS $$
  SELECT role FROM profiles WHERE id = user_id
$$;
\`\`\`

## Validación de Formularios

### 1. Schema con Zod

\`\`\`typescript
// lib/validations.ts
export const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Requerido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
})

export const patientSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  apellido: z.string().min(2, "Mínimo 2 caracteres"),
  dni: z.string().regex(/^\d{7,8}$/, "DNI inválido"),
  telefono: z.string().regex(/^\d{10}$/, "Teléfono inválido"),
  email: z.string().email("Email inválido"),
})
\`\`\`

### 2. React Hook Form

\`\`\`typescript
// Uso en componente
const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: "", password: "" }
})

const onSubmit = async (data: LoginFormData) => {
  try {
    await signIn(data.email, data.password)
  } catch (error) {
    toast.error("Error", error.message)
  }
}

// Renderizado
<Controller
  control={control}
  name="email"
  render={({ field: { onChange, value } }) => (
    <Input
      value={value}
      onChangeText={onChange}
      error={errors.email?.message}
    />
  )}
/>
\`\`\`

## Manejo de Errores Frontend

### 1. Sistema de Toast

\`\`\`typescript
// hooks/useToast.ts
export function useToast() {
  const toast = useCallback((options: ToastOptions) => {
    Alert.alert(
      options.title,
      options.description,
      [{ text: "OK", style: options.type === "error" ? "destructive" : "default" }]
    )
  }, [])

  return { toast, success, error, info, warning }
}
\`\`\`

### 2. Uso en Componentes

\`\`\`typescript
const { toast } = useToast()

try {
  await api.appointments.create(data)
  toast.success("Éxito", "Turno creado correctamente")
} catch (error) {
  if (error instanceof APIError) {
    switch (error.statusCode) {
      case 400:
        toast.error("Error", "Datos inválidos")
        break
      case 401:
        toast.error("Error", "Sesión expirada")
        break
      default:
        toast.error("Error", error.message)
    }
  }
}
\`\`\`

## Navegación

### 1. Expo Router (File-based)

- `app/` → Rutas automáticas
- `(auth)` → Grupos sin layout en URL
- `[id]` → Rutas dinámicas
- `_layout.tsx` → Layouts compartidos

### 2. Navegación Programática

\`\`\`typescript
import { useRouter } from "expo-router"

const router = useRouter()

// Navegar
router.push("/(auth)/login")

// Reemplazar (sin back)
router.replace("/(dashboard)/admin")

// Volver
router.back()
\`\`\`

## Estado Global

### Context API vs Redux

**Por qué Context API:**
- Menos boilerplate
- Suficiente para auth y datos de usuario
- Integración nativa con React
- No necesita middleware adicional

**Cuándo usar Redux:**
- Estado complejo con muchas acciones
- Necesitas time-travel debugging
- Múltiples slices de estado independientes

## Dependencias Clave

\`\`\`json
{
  "expo": "~52.0.0",                    // Framework
  "expo-router": "~4.0.0",              // Navegación file-based
  "@supabase/supabase-js": "^2.39.0",   // Backend y Auth
  "nativewind": "^4.0.1",               // Tailwind para RN
  "react-hook-form": "^7.49.3",         // Formularios
  "zod": "^3.22.4",                     // Validación
  "axios": "^1.6.5",                    // HTTP client
  "@react-native-community/netinfo": "11.4.1",  // Conectividad
  "expo-auth-session": "~6.0.2",        // OAuth
  "expo-image-picker": "~15.0.7"        // Selección de imágenes
}
\`\`\`

## Instalación y Ejecución

\`\`\`bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web
\`\`\`

## Variables de Entorno

\`\`\`env
# .env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_API_URL=https://your-api.com/api
\`\`\`

## Buenas Prácticas

1. **Seguridad:**
   - Nunca almacenar tokens en plain text
   - Usar HTTPS para todas las comunicaciones
   - Implementar RLS en Supabase
   - Validar datos en cliente Y servidor

2. **Performance:**
   - Usar FlatList para listas largas
   - Memoizar componentes con React.memo
   - Lazy load de imágenes
   - Caché de peticiones con SWR o React Query

3. **UX:**
   - Loading states en todas las acciones
   - Error boundaries para errores críticos
   - Feedback visual en interacciones
   - Teclado dismiss al tocar fuera

4. **Código:**
   - TypeScript para type safety
   - Componentes pequeños y reutilizables
   - Separación de lógica de negocio
   - Tests unitarios y de integración

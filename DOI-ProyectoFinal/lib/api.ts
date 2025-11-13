import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from "@react-native-community/netinfo"

// API Error Types
export class APIError extends Error {
  statusCode?: number
  code?: string

  constructor(message: string, statusCode?: number, code?: string) {
    super(message)
    this.name = "APIError"
    this.statusCode = statusCode
    this.code = code
  }
}

// API Response Types
export interface APIResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface APIErrorResponse {
  error: string
  message?: string
  statusCode?: number
}

// API Client Configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://your-api.com/api"
const API_TIMEOUT = 30000 // 30 seconds

class APIClient {
  private client: AxiosInstance
  private refreshTokenPromise: Promise<string> | null = null

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    this.setupInterceptors()
  }

  // Setup request and response interceptors
  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Check network connectivity
        const netInfo = await NetInfo.fetch()
        if (!netInfo.isConnected) {
          throw new APIError("No hay conexión a Internet", 0, "NO_NETWORK")
        }

        // Add auth token if available
        const token = await AsyncStorage.getItem("access_token")
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        console.log("[v0] API Request:", config.method?.toUpperCase(), config.url)
        return config
      },
      (error) => {
        console.error("[v0] Request Error:", error)
        return Promise.reject(error)
      },
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log("[v0] API Response:", response.status, response.config.url)
        return response
      },
      async (error: AxiosError<APIErrorResponse>) => {
        console.error("[v0] Response Error:", error.response?.status, error.config?.url)

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !error.config?.url?.includes("/auth/refresh")) {
          try {
            // Refresh token
            const newToken = await this.refreshAccessToken()

            // Retry original request with new token
            if (error.config && newToken) {
              error.config.headers.Authorization = `Bearer ${newToken}`
              return this.client.request(error.config)
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            await this.handleAuthFailure()
            throw new APIError("Sesión expirada. Por favor inicia sesión nuevamente", 401, "SESSION_EXPIRED")
          }
        }

        // Handle different error types
        return Promise.reject(this.handleError(error))
      },
    )
  }

  // Refresh access token using refresh token
  private async refreshAccessToken(): Promise<string> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise
    }

    this.refreshTokenPromise = (async () => {
      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token")
        if (!refreshToken) {
          throw new Error("No refresh token available")
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        })

        const { access_token, refresh_token: newRefreshToken } = response.data

        // Store new tokens
        await AsyncStorage.setItem("access_token", access_token)
        if (newRefreshToken) {
          await AsyncStorage.setItem("refresh_token", newRefreshToken)
        }

        console.log("[v0] Token refreshed successfully")
        return access_token
      } catch (error) {
        console.error("[v0] Token refresh failed:", error)
        throw error
      } finally {
        this.refreshTokenPromise = null
      }
    })()

    return this.refreshTokenPromise
  }

  // Handle authentication failure
  private async handleAuthFailure() {
    await AsyncStorage.multiRemove(["access_token", "refresh_token", "user_session"])
    // Navigate to login screen - handled by AuthContext
  }

  // Transform axios error to APIError
  private handleError(error: AxiosError<APIErrorResponse>): APIError {
    if (error.response) {
      // Server responded with error status
      const statusCode = error.response.status
      const message = error.response.data?.error || error.response.data?.message || "Error del servidor"

      switch (statusCode) {
        case 400:
          return new APIError(message || "Datos inválidos", 400, "BAD_REQUEST")
        case 401:
          return new APIError("No autorizado", 401, "UNAUTHORIZED")
        case 403:
          return new APIError("No tienes permisos para realizar esta acción", 403, "FORBIDDEN")
        case 404:
          return new APIError("Recurso no encontrado", 404, "NOT_FOUND")
        case 409:
          return new APIError(message || "Conflicto con datos existentes", 409, "CONFLICT")
        case 422:
          return new APIError(message || "Error de validación", 422, "VALIDATION_ERROR")
        case 500:
          return new APIError("Error interno del servidor", 500, "INTERNAL_ERROR")
        case 503:
          return new APIError("Servicio no disponible", 503, "SERVICE_UNAVAILABLE")
        default:
          return new APIError(message || "Error desconocido", statusCode, "UNKNOWN_ERROR")
      }
    } else if (error.request) {
      // Request made but no response received
      return new APIError("No se pudo conectar con el servidor. Verifica tu conexión a Internet", 0, "NETWORK_ERROR")
    } else {
      // Error setting up the request
      return new APIError(error.message || "Error al realizar la petición", 0, "REQUEST_ERROR")
    }
  }

  // Generic request method with retry logic
  private async request<T>(config: AxiosRequestConfig, retries = 3): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<APIResponse<T>> = await this.client.request(config)
      return response.data
    } catch (error) {
      if (retries > 0 && error instanceof APIError && error.code === "NETWORK_ERROR") {
        console.log(`[v0] Retrying request... (${retries} attempts left)`)
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second
        return this.request<T>(config, retries - 1)
      }
      throw error
    }
  }

  // HTTP Methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>({ ...config, method: "GET", url })
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>({ ...config, method: "POST", url, data })
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>({ ...config, method: "PUT", url, data })
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>({ ...config, method: "PATCH", url, data })
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>({ ...config, method: "DELETE", url })
  }

  // Upload file with progress tracking
  async uploadFile<T>(url: string, file: FormData, onProgress?: (progress: number) => void): Promise<APIResponse<T>> {
    return this.request<T>({
      method: "POST",
      url,
      data: file,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      },
    })
  }
}

// Export singleton instance
export const apiClient = new APIClient()

// Convenience methods
export const api = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string) => apiClient.post("/auth/login", { email, password }),
    register: (userData: any) => apiClient.post("/auth/register", userData),
    logout: () => apiClient.post("/auth/logout"),
    refreshToken: (refreshToken: string) => apiClient.post("/auth/refresh", { refresh_token: refreshToken }),
    forgotPassword: (email: string) => apiClient.post("/auth/forgot-password", { email }),
    resetPassword: (token: string, password: string) => apiClient.post("/auth/reset-password", { token, password }),
  },

  // User endpoints
  users: {
    getProfile: () => apiClient.get("/users/profile"),
    updateProfile: (data: any) => apiClient.put("/users/profile", data),
    getAll: () => apiClient.get("/users"),
    getById: (id: string) => apiClient.get(`/users/${id}`),
    create: (data: any) => apiClient.post("/users", data),
    update: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
    delete: (id: string) => apiClient.delete(`/users/${id}`),
  },

  // Appointments endpoints
  appointments: {
    getAll: () => apiClient.get("/appointments"),
    getById: (id: string) => apiClient.get(`/appointments/${id}`),
    create: (data: any) => apiClient.post("/appointments", data),
    update: (id: string, data: any) => apiClient.put(`/appointments/${id}`, data),
    updateStatus: (id: string, status: string) => apiClient.patch(`/appointments/${id}/status`, { status }),
    delete: (id: string) => apiClient.delete(`/appointments/${id}`),
    getMine: () => apiClient.get("/appointments/mine"),
  },

  // Patients endpoints
  patients: {
    getAll: () => apiClient.get("/patients"),
    getById: (id: string) => apiClient.get(`/patients/${id}`),
    create: (data: any) => apiClient.post("/patients", data),
    update: (id: string, data: any) => apiClient.put(`/patients/${id}`, data),
    delete: (id: string) => apiClient.delete(`/patients/${id}`),
    search: (query: string) => apiClient.get(`/patients/search?q=${query}`),
  },

  // Studies endpoints
  studies: {
    getAll: () => apiClient.get("/studies"),
    getById: (id: string) => apiClient.get(`/studies/${id}`),
    create: (data: any) => apiClient.post("/studies", data),
    update: (id: string, data: any) => apiClient.put(`/studies/${id}`, data),
    delete: (id: string) => apiClient.delete(`/studies/${id}`),
    getMine: () => apiClient.get("/studies/mine"),
    uploadImages: (studyId: string, images: FormData, onProgress?: (progress: number) => void) =>
      apiClient.uploadFile(`/studies/${studyId}/images`, images, onProgress),
  },
}

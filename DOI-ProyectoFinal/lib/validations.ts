import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
})

export const registerSchema = z
  .object({
    nombre: z
      .string()
      .min(2, "Mínimo 2 caracteres")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras"),
    apellido: z
      .string()
      .min(2, "Mínimo 2 caracteres")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras"),
    dni: z.string().length(8, "DNI debe tener 8 dígitos").regex(/^\d+$/, "Solo números"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export const patientSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  apellido: z.string().min(2, "Mínimo 2 caracteres"),
  dni: z.string().length(8, "DNI debe tener 8 dígitos").regex(/^\d+$/, "Solo números"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  telefono: z.string().optional(),
  fecha_nacimiento: z.string().optional(),
  direccion: z.string().optional(),
})

export const appointmentSchema = z.object({
  patient_dni: z.string().length(8, "DNI debe tener 8 dígitos").regex(/^\d+$/, "Solo números"),
  tipo_estudio: z.string().min(1, "Selecciona un tipo de estudio"),
  fecha_turno: z.string().min(1, "Selecciona fecha y hora"),
  notas: z.string().optional(),
})

export const studySchema = z.object({
  patient_nombre: z.string().min(2, "Mínimo 2 caracteres"),
  patient_apellido: z.string().min(2, "Mínimo 2 caracteres"),
  patient_dni: z.string().length(8, "DNI debe tener 8 dígitos").regex(/^\d+$/, "Solo números"),
  tipo_estudio: z.string().min(1, "Selecciona un tipo de estudio"),
  fecha_estudio: z.string().min(1, "Selecciona una fecha"),
  descripcion: z.string().optional(),
})

export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type PatientForm = z.infer<typeof patientSchema>
export type AppointmentForm = z.infer<typeof appointmentSchema>
export type StudyForm = z.infer<typeof studySchema>

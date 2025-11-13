import { View, Text, ScrollView, Pressable } from "react-native"
import { Link } from "expo-router"
import { Award, Microscope, Shield, Clock, ArrowRight, CheckCircle } from "lucide-react-native"

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      {/* Hero Section */}
      <View className="bg-primary/10 px-4 py-12">
        <View className="max-w-3xl mx-auto">
          <Text className="text-3xl font-bold text-center text-foreground mb-4">
            Diagnóstico Odontológico por Imagen
          </Text>
          <Text className="text-base text-center text-muted-foreground mb-6">
            Más de 30 años de experiencia en radiología dental y maxilofacial. Tecnología de vanguardia y atención
            personalizada.
          </Text>
          <View className="flex-row gap-3 justify-center">
            <Link href="/contacto" asChild>
              <Pressable className="bg-primary px-6 py-3 rounded-lg flex-row items-center">
                <Text className="text-primary-foreground font-semibold mr-2">Agendar Cita</Text>
                <ArrowRight size={16} color="white" />
              </Pressable>
            </Link>
            <Link href="/servicios" asChild>
              <Pressable className="border border-border px-6 py-3 rounded-lg">
                <Text className="text-foreground font-semibold">Ver Servicios</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View className="px-4 py-12">
        <Text className="text-2xl font-bold text-center mb-3">¿Por qué elegirnos?</Text>
        <Text className="text-center text-muted-foreground mb-8">Somos líderes en diagnóstico por imagen dental</Text>

        <View className="gap-4">
          <View className="bg-card border border-border rounded-lg p-4">
            <Award size={32} color="#3b82f6" className="mb-2" />
            <Text className="text-lg font-semibold mb-2">Experiencia</Text>
            <Text className="text-muted-foreground">
              Más de 30 años brindando servicios de radiología dental especializada
            </Text>
          </View>

          <View className="bg-card border border-border rounded-lg p-4">
            <Microscope size={32} color="#3b82f6" className="mb-2" />
            <Text className="text-lg font-semibold mb-2">Tecnología</Text>
            <Text className="text-muted-foreground">
              Equipos de última generación para diagnósticos precisos y detallados
            </Text>
          </View>

          <View className="bg-card border border-border rounded-lg p-4">
            <Shield size={32} color="#3b82f6" className="mb-2" />
            <Text className="text-lg font-semibold mb-2">Confianza</Text>
            <Text className="text-muted-foreground">Convenios con las principales aseguradoras del país</Text>
          </View>

          <View className="bg-card border border-border rounded-lg p-4">
            <Clock size={32} color="#3b82f6" className="mb-2" />
            <Text className="text-lg font-semibold mb-2">Rapidez</Text>
            <Text className="text-muted-foreground">
              Resultados entregados en tiempo récord sin comprometer la calidad
            </Text>
          </View>
        </View>
      </View>

      {/* Services Preview */}
      <View className="bg-muted/30 px-4 py-12">
        <Text className="text-2xl font-bold text-center mb-3">Nuestros Servicios</Text>
        <Text className="text-center text-muted-foreground mb-8">
          Ofrecemos una amplia gama de estudios radiológicos especializados
        </Text>

        <View className="gap-4">
          <View className="bg-card border border-border rounded-lg p-4">
            <Text className="text-lg font-semibold mb-2">Radiografía Panorámica</Text>
            <Text className="text-muted-foreground mb-3">
              Vista completa de dientes, maxilares y estructuras circundantes
            </Text>
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <CheckCircle size={16} color="#3b82f6" />
                <Text className="text-sm">Diagnóstico integral</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <CheckCircle size={16} color="#3b82f6" />
                <Text className="text-sm">Baja radiación</Text>
              </View>
            </View>
          </View>

          <View className="bg-card border border-border rounded-lg p-4">
            <Text className="text-lg font-semibold mb-2">Tomografía Cone Beam</Text>
            <Text className="text-muted-foreground mb-3">
              Imágenes 3D de alta resolución para planificación de implantes
            </Text>
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <CheckCircle size={16} color="#3b82f6" />
                <Text className="text-sm">Precisión milimétrica</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <CheckCircle size={16} color="#3b82f6" />
                <Text className="text-sm">Visualización 3D</Text>
              </View>
            </View>
          </View>
        </View>

        <Link href="/servicios" asChild>
          <Pressable className="bg-primary px-6 py-3 rounded-lg mt-6 flex-row items-center justify-center">
            <Text className="text-primary-foreground font-semibold mr-2">Ver Todos los Servicios</Text>
            <ArrowRight size={16} color="white" />
          </Pressable>
        </Link>
      </View>

      {/* CTA Section */}
      <View className="px-4 py-12">
        <View className="bg-primary rounded-lg p-6">
          <Text className="text-2xl font-bold text-center text-primary-foreground mb-3">
            ¿Listo para agendar tu estudio?
          </Text>
          <Text className="text-center text-primary-foreground/90 mb-6">
            Contamos con convenios con las principales aseguradoras
          </Text>
          <Link href="/contacto" asChild>
            <Pressable className="bg-secondary px-6 py-3 rounded-lg">
              <Text className="text-secondary-foreground font-semibold text-center">Contactar Ahora</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  )
}

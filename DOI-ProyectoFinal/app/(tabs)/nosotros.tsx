import { View, Text, ScrollView } from "react-native"
import { Award, Users, Target, Heart } from "lucide-react-native"

export default function NosotrosScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="bg-primary/10 px-4 py-8">
        <Text className="text-3xl font-bold text-center text-foreground mb-3">Sobre Nosotros</Text>
        <Text className="text-center text-muted-foreground">
          Más de 30 años de experiencia en diagnóstico por imagen dental
        </Text>
      </View>

      <View className="px-4 py-8 gap-6">
        <View className="bg-card border border-border rounded-lg p-4">
          <Award size={40} color="#3b82f6" className="mb-3" />
          <Text className="text-xl font-bold mb-2">Nuestra Historia</Text>
          <Text className="text-muted-foreground leading-relaxed">
            Desde 1992, DOI ha sido líder en diagnóstico odontológico por imagen en Argentina. Fundada por profesionales
            especializados en radiología maxilofacial, nos hemos consolidado como referentes en el sector.
          </Text>
        </View>

        <View className="bg-card border border-border rounded-lg p-4">
          <Target size={40} color="#3b82f6" className="mb-3" />
          <Text className="text-xl font-bold mb-2">Nuestra Misión</Text>
          <Text className="text-muted-foreground leading-relaxed">
            Proporcionar diagnósticos radiológicos precisos y confiables utilizando tecnología de vanguardia,
            contribuyendo al éxito de los tratamientos odontológicos de nuestros pacientes.
          </Text>
        </View>

        <View className="bg-card border border-border rounded-lg p-4">
          <Users size={40} color="#3b82f6" className="mb-3" />
          <Text className="text-xl font-bold mb-2">Nuestro Equipo</Text>
          <Text className="text-muted-foreground leading-relaxed">
            Contamos con un equipo de profesionales altamente capacitados, en constante actualización con las últimas
            tecnologías y técnicas en radiología dental.
          </Text>
        </View>

        <View className="bg-card border border-border rounded-lg p-4">
          <Heart size={40} color="#3b82f6" className="mb-3" />
          <Text className="text-xl font-bold mb-2">Nuestros Valores</Text>
          <View className="gap-2 mt-2">
            <Text className="text-muted-foreground">• Excelencia profesional</Text>
            <Text className="text-muted-foreground">• Atención personalizada</Text>
            <Text className="text-muted-foreground">• Innovación tecnológica</Text>
            <Text className="text-muted-foreground">• Compromiso con la calidad</Text>
            <Text className="text-muted-foreground">• Ética y confidencialidad</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

import { View, Text, ScrollView } from "react-native"
import { Camera, Scan, Brain, FileText, Bone } from "lucide-react-native"

export default function ServiciosScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="bg-primary/10 px-4 py-8">
        <Text className="text-3xl font-bold text-center text-foreground mb-3">Nuestros Servicios</Text>
        <Text className="text-center text-muted-foreground">
          Estudios radiológicos especializados con tecnología de última generación
        </Text>
      </View>

      <View className="px-4 py-8 gap-6">
        {/* Radiografía Panorámica */}
        <View className="bg-card border border-border rounded-lg p-4">
          <Camera size={40} color="#3b82f6" className="mb-3" />
          <Text className="text-xl font-bold mb-2">Radiografía Panorámica</Text>
          <Text className="text-muted-foreground mb-4">Vista completa de la cavidad oral en una sola imagen</Text>
          <Text className="font-semibold mb-2">Indicaciones:</Text>
          <View className="gap-2">
            <Text className="text-sm">• Evaluación general de la dentición</Text>
            <Text className="text-sm">• Detección de dientes impactados</Text>
            <Text className="text-sm">• Evaluación de estructuras óseas</Text>
            <Text className="text-sm">• Planificación de tratamientos ortodónticos</Text>
          </View>
        </View>

        {/* Tomografía Cone Beam */}
        <View className="bg-card border border-border rounded-lg p-4">
          <Scan size={40} color="#3b82f6" className="mb-3" />
          <Text className="text-xl font-bold mb-2">Tomografía Cone Beam (CBCT)</Text>
          <Text className="text-muted-foreground mb-4">Imágenes 3D de alta resolución</Text>
          <Text className="font-semibold mb-2">Indicaciones:</Text>
          <View className="gap-2">
            <Text className="text-sm">• Planificación de implantes dentales</Text>
            <Text className="text-sm">• Evaluación de vías aéreas</Text>
            <Text className="text-sm">• Cirugía maxilofacial</Text>
            <Text className="text-sm">• Evaluación de ATM</Text>
          </View>
        </View>

        {/* Cefalometría */}
        <View className="bg-card border border-border rounded-lg p-4">
          <Brain size={40} color="#3b82f6" className="mb-3" />
          <Text className="text-xl font-bold mb-2">Cefalometría</Text>
          <Text className="text-muted-foreground mb-4">Análisis craneofacial para ortodoncia</Text>
          <Text className="font-semibold mb-2">Indicaciones:</Text>
          <View className="gap-2">
            <Text className="text-sm">• Planificación ortodóntica</Text>
            <Text className="text-sm">• Evaluación de crecimiento craneofacial</Text>
            <Text className="text-sm">• Cirugía ortognática</Text>
            <Text className="text-sm">• Análisis de perfil facial</Text>
          </View>
        </View>

        {/* Radiografías Periapicales */}
        <View className="bg-card border border-border rounded-lg p-4">
          <FileText size={40} color="#3b82f6" className="mb-3" />
          <Text className="text-xl font-bold mb-2">Radiografías Periapicales</Text>
          <Text className="text-muted-foreground mb-4">Imágenes detalladas de dientes individuales</Text>
          <Text className="font-semibold mb-2">Indicaciones:</Text>
          <View className="gap-2">
            <Text className="text-sm">• Detección de caries</Text>
            <Text className="text-sm">• Evaluación endodóntica</Text>
            <Text className="text-sm">• Diagnóstico de infecciones periapicales</Text>
            <Text className="text-sm">• Evaluación de nivel óseo</Text>
          </View>
        </View>

        {/* Estudios de ATM */}
        <View className="bg-card border border-border rounded-lg p-4">
          <Bone size={40} color="#3b82f6" className="mb-3" />
          <Text className="text-xl font-bold mb-2">Estudios de ATM</Text>
          <Text className="text-muted-foreground mb-4">Evaluación de articulación temporomandibular</Text>
          <Text className="font-semibold mb-2">Indicaciones:</Text>
          <View className="gap-2">
            <Text className="text-sm">• Dolor en la articulación</Text>
            <Text className="text-sm">• Limitación de apertura bucal</Text>
            <Text className="text-sm">• Ruidos articulares</Text>
            <Text className="text-sm">• Evaluación pre y post tratamiento</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

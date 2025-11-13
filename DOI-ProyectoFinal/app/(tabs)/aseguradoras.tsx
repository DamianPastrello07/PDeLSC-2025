import { View, Text, ScrollView } from "react-native"
import { Shield, CheckCircle } from "lucide-react-native"

export default function AseguradorasScreen() {
  const insuranceCompanies = [
    "Amec",
    "Amepba",
    "Amffa",
    "Apm",
    "AMOF",
    "Casa",
    "CEO: Odel",
    "CEO: Ospec",
    "CEO: Ospedyc",
    "CEO: Ospep",
    "Galeno",
    "IOMA",
    "Medicus",
    "OSDE",
    "PAMI",
    "Sancor Salud",
    "Swiss Medical",
    "Union Personal",
    "UOM",
    "UTA",
  ]

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="bg-primary/10 px-4 py-8 items-center">
        <Shield size={48} color="#3b82f6" className="mb-4" />
        <Text className="text-3xl font-bold text-center text-foreground mb-3">Obras Sociales</Text>
        <Text className="text-center text-muted-foreground">
          Trabajamos con las principales Obras Sociales del país
        </Text>
      </View>

      <View className="px-4 py-8">
        <Text className="text-2xl font-bold text-center mb-6">Aseguradoras Afiliadas</Text>

        <View className="gap-3 mb-8">
          {insuranceCompanies.map((company) => (
            <View key={company} className="flex-row items-center gap-2 bg-card border border-border rounded-lg p-3">
              <CheckCircle size={20} color="#3b82f6" />
              <Text className="font-medium">{company}</Text>
            </View>
          ))}
        </View>

        <View className="bg-primary/5 border border-primary/50 rounded-lg p-4">
          <Text className="text-sm text-center text-muted-foreground">
            Si tu obra social no aparece en la lista, contáctanos. Podemos gestionar tu estudio y proporcionarte la
            factura para reembolso.
          </Text>
        </View>
      </View>

      <View className="px-4 pb-8">
        <Text className="text-2xl font-bold text-center mb-6">Documentos Necesarios</Text>

        <View className="bg-card border border-border rounded-lg p-4">
          <View className="gap-3">
            <View className="flex-row items-start gap-2">
              <CheckCircle size={20} color="#3b82f6" className="mt-0.5" />
              <Text className="flex-1">Póliza de seguro vigente</Text>
            </View>
            <View className="flex-row items-start gap-2">
              <CheckCircle size={20} color="#3b82f6" className="mt-0.5" />
              <Text className="flex-1">Identificación oficial</Text>
            </View>
            <View className="flex-row items-start gap-2">
              <CheckCircle size={20} color="#3b82f6" className="mt-0.5" />
              <Text className="flex-1">Orden médica o formato de autorización</Text>
            </View>
            <View className="flex-row items-start gap-2">
              <CheckCircle size={20} color="#3b82f6" className="mt-0.5" />
              <Text className="flex-1">Número de póliza y datos del asegurado</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

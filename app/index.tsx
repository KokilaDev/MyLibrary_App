import { Link, Redirect } from "expo-router"
import "../global.css"
import { ActivityIndicator, Text, View } from "react-native"
import { useAuth } from "@/hooks/useAuth";

export default function App() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#4ade80" />
      </View>
    )

  if (user) {
    return <Redirect href={"/home"} />
  } else {
    return <Redirect href={"/login"} />
  }
}
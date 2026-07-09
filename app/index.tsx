import { Link } from "expo-router"
import "../global.css"
import { Text, View } from "react-native"

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Hello, My First Mobile App
      </Text>
      <Link href={"/login"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go to Login
      </Link>
      <Link href={"/home"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go to Home
      </Link>
    </View>
  )
}
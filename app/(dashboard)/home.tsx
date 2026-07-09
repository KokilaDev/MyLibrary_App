import { Link } from "expo-router"
import { View, Text } from "react-native"

const Home = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-blue-500">
                Home Page
            </Text>
            <Link href={"/category"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Go to Category
            </Link>
            <Link href={"/settings"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Go to Settings
            </Link>
        </View>
    )
}

export default Home
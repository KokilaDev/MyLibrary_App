import { Link } from "expo-router"
import { View, Text } from "react-native"

const MyBooks = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-blue-500">
                My Books Page
            </Text>
            <Link href={"/manageBook"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Go to Manage Book
            </Link>
        </View>
    )
}

export default MyBooks
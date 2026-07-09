import { Link } from "expo-router"
import { View, Text } from "react-native"

const Books = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-blue-500">
                All Books Page
            </Text>
            <Link href={"/borrowHistory"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Go to Borrow History
            </Link>
            <Link href={"/borrowedBooks"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Go to Borrowed Books
            </Link>
        </View>
    )
}

export default Books
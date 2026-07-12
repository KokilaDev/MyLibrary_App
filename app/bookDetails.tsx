import { Link } from "expo-router"
import { View, Text } from "react-native"

const BookDetails = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-blue-500">
                Book Details Page
            </Text>
            <Link href={"/readingArea"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Go to Reading Area
            </Link>
        </View>
    )
}

export default BookDetails
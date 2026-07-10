import { useLoader } from "@/hooks/useLoader";
import { login } from "@/services/authService";
import { router } from "expo-router"
import { useState } from "react";
import { View, Text, Alert, TextInput, Keyboard, TouchableWithoutFeedback, Pressable, TouchableOpacity } from "react-native"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showLoader, hideLoader, isLoading } = useLoader();
  
  const handleLogin = async () => {
    if (!email || !password || isLoading) {
      Alert.alert("Please enter email and password");
      return;
    }
    showLoader();
    try {
      await login(email, password);
      router.replace("/home");
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed");
    } finally {
      hideLoader();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 justify-center items-center bg-gray-50 p-6">
        <View className="w-full bg-white/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <Text className="text-3xl font-bold mb-6 text-center text-gray-900">
            Login
          </Text>
          <TextInput 
            placeholder="Email"
            placeholderTextColor="#6b7280"
            className="border bg-gray-300 p-3 mb-4 rounded-xl"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            placeholder="Password"
            placeholderTextColor="#6b7280"
            className="border bg-gray-300 p-3 mb-4 rounded-xl"
            value={password}
            onChangeText={setPassword}
          />
          <Pressable 
            className="bg-blue-600/80 px-6 py-3 rounded-xl"
            onPress={handleLogin}
          >
            <Text className="text-white text-lg text-center">Login</Text>
          </Pressable>
          <View className="flex-row justify-center mt-2">
            <Text className="text-gray-600">
              Do not have an account? 
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/register")}
            >
              <Text className="text-blue-600 font-semibold">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Login;
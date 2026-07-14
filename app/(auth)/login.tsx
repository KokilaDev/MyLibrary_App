import { useLoader } from "@/hooks/useLoader";
import { login } from "@/services/authService";
import { router } from "expo-router"
import { BookText, Eye, LockIcon, Mail } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Alert, TextInput, Keyboard, TouchableWithoutFeedback, Pressable, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

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
    <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss} 
      accessible={false}
    >
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <BookText size={40} color="#323232" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText1}>My</Text>
            <Text style={styles.headerText2}>Library</Text>
          </View>
          <Text style={styles.subheaderText}>Welcome back! Please login to your account.</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputField}>
              <Mail size={16} color="#999" />
              <TextInput 
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Security Key</Text>
            <View style={styles.inputField}>
              <LockIcon size={16} color="#999" />
              <TextInput 
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Eye size={18} color="#999" />
            </View>
          </View>
          <Pressable 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>SIGN IN</Text>
          </Pressable>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              New to MyLibrary?
            </Text>
            <TouchableOpacity
              style={styles.registerLink}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.registerLinkText}>Register here</Text>
            </TouchableOpacity>
          </View>
        </View>
      
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  headerIcon: {
    borderWidth: 1,
    borderColor: "#323232",
    borderStyle: 'dashed',
    borderRadius: 50,
    padding: 15,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  headerText1: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
  },
  headerText2: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#999999",
  },
  subheaderText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  formContainer: {
    padding: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  textInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    marginLeft: 5,
  },
  registerLinkText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
})

export default Login;
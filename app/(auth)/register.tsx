import { router } from "expo-router"
import { useState } from "react";
import { View, Text, Alert, TextInput, TouchableWithoutFeedback, Keyboard, Pressable, TouchableOpacity, StyleSheet } from "react-native"
import { useLoader } from "@/hooks/useLoader";
import { registerUser } from "@/services/authService";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookText, Eye, EyeOff, LockIcon, Mail, User } from "lucide-react-native";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || isLoading) {
      Alert.alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    showLoader();
    try {
      await registerUser(name, email, password, "user");
      Alert.alert("Account created");
      router.replace("/login");
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  };

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
          <Text style={styles.subheaderText}>Create an account to get started</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputField}>
              <User size={16} color="#999" />
              <TextInput 
                style={styles.textInput}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
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
          <View style={styles.secureContainer}>
            <View style={styles.secureInputContainer}>
              <Text style={styles.inputLabel}>Security Key</Text>
              <View style={styles.inputField}>
                <LockIcon size={16} color="#999" />
                <TextInput 
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={18} color="#999" />
                  ) : (
                    <Eye size={18} color="#999" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.secureInputContainer}>
              <Text style={styles.inputLabel}>Confirm Key</Text>
              <View style={styles.inputField}>
                <LockIcon size={16} color="#999" />
                <TextInput 
                  style={styles.textInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                {showConfirmPassword ? (
                  <EyeOff size={18} color="#999" />
                ) : (
                  <Eye size={18} color="#999" />
                )}
              </View>
            </View>
          </View>
          <Pressable 
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.back()}
            >
              <Text style={styles.loginLinkText}>Sign In</Text>
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
  secureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secureInputContainer: {
    width: "48%",
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    marginLeft: 5,
  },
  loginLinkText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
})

export default Register;
import { useRouter } from "expo-router";
import { BellOff, ChevronLeft } from "lucide-react-native"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Notifications = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={20} color="#1A181B" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Notifications</Text>
            <Text style={styles.subheaderText}>See your latest updates and alerts</Text>
          </View>
        </View>

        <View style={styles.notificationsContainer}>
          <BellOff size={50} color="#999" />
          <Text style={styles.noNotificationsText}>No notifications</Text>
          <Text style={styles.noNotificationsSubtext}>Check back later for updates.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A181B",
    fontFamily: "Poppins-Bold",
  },
  subheaderText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  notificationsContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 18,
    borderStyle: "dashed",
    padding: 40,
    marginHorizontal: 20,
    marginTop: 100,
  },
  noNotificationsText: {
    fontSize: 18,
    color: "#1A181B",
    fontFamily: "Poppins-Bold",
    marginTop: 20,
  },
  noNotificationsSubtext: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
    marginTop: 10,
  },
})

export default Notifications
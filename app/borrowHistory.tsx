import { useRouter } from "expo-router";
import { ChevronLeft, CircleCheck, Clock3, TriangleAlert } from "lucide-react-native"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const BorrowHistory = () => {
  const router = useRouter();

  const history = [
    {
      title: "The Shadow of the Oak",
      status: "Borrowed",
      checked: "2026-06-15",
      due: "2026-07-15",
      icon: "clock",
    },
    {
      title: "Whispers in the Sage",
      status: "Borrowed",
      checked: "2026-07-01",
      due: "2026-07-15",
      icon: "clock",
    },
    {
      title: "The Library of Infinite Chambers",
      status: "Returned",
      checked: "2026-05-10",
      due: "2026-05-24",
      icon: "check",
    },
    {
      title: "The Mauve Hour",
      status: "Overdue",
      checked: "2026-04-01",
      due: "2026-04-15",
      icon: "alert",
    },
  ];

  const renderIcon = (type: string) => {
    if (type === "clock") return <Clock3 size={18} color="#1A181B" />;
    if (type === "check") return <CircleCheck size={18} color="#fff" />;
    else return <TriangleAlert size={18} color="#fff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={20} color="#1A181B" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Borrow History</Text>
            <Text style={styles.subheaderText}>Chronological book checkout timeline</Text>
          </View>
        </View>

        <View style={styles.timelineContainer}>
          {history.map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.leftSection}>
                <View 
                  style={[
                    styles.iconCircle,
                    item.status === "Returned" && { backgroundColor: "#47534a" },
                    item.status === "Overdue" && { backgroundColor: "#693535" },
                  ]}
                >
                  {renderIcon(item.icon)}
                </View>
                {
                  index !== history.length - 1 && 
                  <View style={styles.line} />
                }
              </View>
              <View style={styles.card}>
                <View style={styles.titleRow}>
                  <Text style={styles.bookTitle}>{item.title}</Text>
                  <View
                    style={[
                      styles.badge,
                      item.status === "Returned" && { backgroundColor: "#dce8dd" },
                      item.status === "Overdue" && { backgroundColor: "#f3d7d7" },
                    ]}
                  >
                    <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={styles.date}>Checked Out: {item.checked}</Text>
                <Text style={styles.date}>Due Date: {item.due}</Text>
                {
                  item.status !== "Returned" &&
                  <TouchableOpacity style={styles.returnButton}>
                    <Text style={styles.returnText}>Return Book</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
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
  timelineContainer: {
    marginTop: 25,
  },
  timelineItem: {
    flexDirection: "row",
  },
  leftSection: {
    width: 45,
    alignItems: "center",
    marginRight: 10,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 20,
    backgroundColor: "#e6c79c",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    width: 1,
    flex: 1,
    backgroundColor: "#dddddd",
    marginVertical: 5,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 15,
    padding: 12,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookTitle: {
   fontSize: 14,
   fontWeight: "700",
   color: "#1A181B", 
   flex: 1,
  },
  badge: {
    backgroundColor: "#e7c995",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#1a181b",
  },
  date: {
    fontSize: 11,
    color: "#666",
    marginTop: 5,
  },
  returnButton: {
    backgroundColor:"#21191B",
    marginTop:10,
    height:20,
    borderRadius:4,
    alignItems:"center",
    justifyContent:"center"
  },
  returnText:{
    color:"#fff",
    fontSize:9,
    fontWeight:"700"
  },
})

export default BorrowHistory
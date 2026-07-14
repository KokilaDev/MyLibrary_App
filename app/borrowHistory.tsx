import { LoaderContext } from "@/context/LoaderContext";
import { getBorrowHistory, returnBook } from "@/services/bookService";
import { useRouter } from "expo-router";
import { ChevronLeft, CircleCheck, Clock3, TriangleAlert } from "lucide-react-native"
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const BorrowHistory = () => {
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);
  const { showLoader, hideLoader } = useContext(LoaderContext);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      showLoader();
      const userId = "USER_ID";
      const data = await getBorrowHistory(userId);
      setHistory(data);
    } catch (error) {
      console.error("Error fetching borrow history:", error);
    } finally {
      hideLoader();
    }
  }

  const getStatus = (book: any) => {
    if (book.returned) return "Returned";
    const dueDate = book.dueDate.toDate();
    if (new Date() > dueDate) return "Overdue";
    return "Borrowed";
  }

  const renderIcon = (status: string) => {
    switch (status) {
      case "Returned":
        return <CircleCheck size={18} color="#fff" />;
      case "Overdue":
        return <TriangleAlert size={18} color="#fff" />;
      default:
        return <Clock3 size={18} color="#1A181B" />;
    }
  }

  const handleReturn = async (bookId: string) => {
    await returnBook(bookId);
    loadHistory();
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
          {history.map((item, index) => {
            const status = getStatus(item);
            return (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.leftSection}>
                  <View 
                    style={[
                        styles.iconCircle,
                        status === "Returned" && { backgroundColor: "#47534a" },
                        status === "Overdue" && { backgroundColor: "#693535" },
                    ]}
                  >
                    {renderIcon(status)}
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
                        status === "Returned" && { backgroundColor: "#dce8dd" },
                        status === "Overdue" && { backgroundColor: "#f3d7d7" },
                      ]}
                    >
                      <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
                    </View>
                  </View>
                  <Text style={styles.date}>Checked Out: {item.borrowedDate?.toDate().toLocaleDateString()}</Text>
                    <Text style={styles.date}>Due Date: {item.dueDate?.toDate().toLocaleDateString()}</Text>
                    {
                    status !== "Returned" &&
                    <TouchableOpacity 
                      style={styles.returnButton}
                      onPress={() => handleReturn(item.id)}
                    >
                      <Text style={styles.returnText}>Return Book</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            );
          })}
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
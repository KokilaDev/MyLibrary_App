import { useRouter } from "expo-router"
import { Atom, TrendingUp, BookOpen, ChevronLeft, Compass, GraduationCap, Sparkles, Cpu, UserRound, Smile, Image } from "lucide-react-native";
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Category = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={20} color="#1A181B" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Categories</Text>
            <Text style={styles.subheaderText}>Select genres to filter books</Text>
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryButton}>
            <View style={styles.iconContainer}>
              <Sparkles size={20} color="#1A181B" />
            </View>
            <Text style={styles.title}>Fantasy</Text>
            <Text style={styles.bookCount}>14 Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <View style={styles.iconContainer}>
              <BookOpen size={20} color="#1A181B" />
            </View>
            <Text style={styles.title}>Novel</Text>
            <Text style={styles.bookCount}>22 Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <View style={styles.iconContainer}>
              <Atom size={20} color="#1A181B" />
            </View>
            <Text style={styles.title}>Science</Text>
            <Text style={styles.bookCount}>9 Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <View style={styles.iconContainer}>
              <GraduationCap size={20} color="#1A181B" />
            </View>
            <Text style={styles.title}>Education</Text>
            <Text style={styles.bookCount}>18 Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <View style={styles.iconContainer}>
              <Compass size={20} color="#1A181B" />
            </View>
            <Text style={styles.title}>History</Text>
            <Text style={styles.bookCount}>12 Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <View style={styles.iconContainer}>
              <TrendingUp size={20} color="#1A181B" />
            </View>
            <Text style={styles.title}>Business</Text>
            <Text style={styles.bookCount}>15 Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <View style={styles.iconContainer}>
              <Cpu size={20} color="#1A181B" />
            </View>
            <Text style={styles.title}>Technology</Text>
            <Text style={styles.bookCount}>20 Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <View style={styles.iconContainer}>
              <UserRound size={20} color="#1A181B" />
            </View>
            <Text style={styles.title}>Biography</Text>
            <Text style={styles.bookCount}>11 Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <View style={styles.iconContainer}>
              <Smile size={20} color="#1A181B" />
            </View>
            <Text style={styles.title}>Self-help</Text>
            <Text style={styles.bookCount}>8 Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <View style={styles.iconContainer}>
              <Image size={20} color="#1A181B" />
            </View>
            <Text style={styles.title}>Art</Text>
            <Text style={styles.bookCount}>10 Books</Text>
          </TouchableOpacity>
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
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 6,
    marginTop: 28,
  },
  categoryButton: {
    flexDirection: "column",
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 30,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A181B",
    fontFamily: "Poppins-Bold",
  },
  bookCount: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
});

export default Category
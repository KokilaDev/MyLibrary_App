import { CATEGORY_MAP } from "@/constants/data";
import { LoaderContext } from "@/context/LoaderContext";
import { getBooks } from "@/services/bookService";
import { useRouter } from "expo-router"
import { Atom, TrendingUp, BookOpen, ChevronLeft, Compass, GraduationCap, Sparkles, Cpu, UserRound, Smile, Image } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Book {
  id: number;
  subjects: string[];
}

const Category = () => {
  const router = useRouter();
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const [books, setBooks] = useState<Book[]>([]);

  const categories = [
    { name: "Fantasy", icon: Sparkles },
    { name: "Novel", icon: BookOpen },
    { name: "Science", icon: Atom },
    { name: "Education", icon: GraduationCap },
    { name: "History", icon: Compass },
    { name: "Business", icon: TrendingUp },
    { name: "Technology", icon: Cpu },
    { name: "Biography", icon: UserRound },
    { name: "Children", icon: Smile },
    { name: "Comics", icon: Image },
  ];

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      showLoader();
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      hideLoader();
    }
  }

  const getBookCountByCategory = (category: string) => {
    const keywords = CATEGORY_MAP[category as keyof typeof CATEGORY_MAP];

    return books.filter((book) =>
      book.subjects.some((subject) =>
        keywords.some((keyword) =>
          subject.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    ).length;
  }
  
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

          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <TouchableOpacity
                key={item.name}
                style={styles.categoryButton}
                onPress={() => 
                  router.push({
                    pathname: "/(dashboard)/books",
                    params: { category: item.name },
                  })
                }
              >
                <View style={styles.iconContainer}>
                  <Icon size={20} color="#1A181B" />
                </View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.bookCount}>
                  {getBookCountByCategory(item.name)} Books
                </Text>
              </TouchableOpacity>
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
import { Book, CATEGORIES, CATEGORY_MAP } from "@/constants/data";
import { LoaderContext } from "@/context/LoaderContext";
import { getBooks } from "@/services/bookService";
import { router, useLocalSearchParams } from "expo-router";
import { Search } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Books = () => {
  const { category } = useLocalSearchParams();
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const [selectedCategory, setSelectedCategory] = useState(
    typeof category === "string" ? category : "All",
  );
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (typeof category === "string") {
      setSelectedCategory(category);
    }
  }, [category]);

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
  };

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book: any) => {
          const keywords =
            CATEGORY_MAP[selectedCategory as keyof typeof CATEGORY_MAP];
          return book.subjects.some((subject: string) =>
            keywords.some((keyword) =>
              subject.toLowerCase().includes(keyword.toLowerCase()),
            ),
          );
        });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>All Books</Text>
            <Text style={styles.subheaderText}>
              Explore our collection of books
            </Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#999999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search books or authors..."
            placeholderTextColor="#999999"
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryCard,
                  isSelected && styles.activeCategoryCard,
                ]}
              >
                <Text
                  style={[
                    styles.categoryCardText,
                    isSelected && styles.activeCategoryCardText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Showing {filteredBooks.length} Books
          </Text>
        </View>

        <View style={styles.bookContainer}>
          {filteredBooks.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookCard}
              onPress={() => {
                router.push({
                  pathname: "/bookDetails",
                  params: {
                    id: book.id,
                  },
                });
              }}
            >
              <Image
                source={{
                  uri: book.formats["image/jpeg"],
                }}
                style={styles.bookCover}
              />
              <View style={styles.bookContent}>
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.bookAuthor}>
                  {book.authors[0]?.name ?? "Unknown Author"}
                </Text>
                <View style={styles.middleRow}>
                  <View>
                    <Text style={styles.categoryRow}>
                      {book.subjects[0] ?? "General"}
                    </Text>
                  </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.buttonContainer}>
                  <View style={styles.borrowButtonContainer}>
                    <TouchableOpacity style={styles.borrowButton}>
                      <Text style={styles.borrowButtonText}>Borrow</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 24,
    shadowColor: "#999999",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#999999",
    fontSize: 14,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  categoryCardText: {
    fontSize: 14,
    color: "#1A181B",
    fontFamily: "Poppins-Regular",
  },
  activeCategoryCard: {
    backgroundColor: "#1A181B",
  },
  activeCategoryCardText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },
  bookContainer: {
    marginBottom: 40,
  },
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 14,
  },
  bookContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A181B",
  },
  bookAuthor: {
    marginTop: 2,
    fontSize: 14,
    color: "#666",
  },
  middleRow: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryRow: {
    fontSize: 14,
    color: "#7A7A7A",
  },
  bullet: {
    fontSize: 18,
    color: "#1A181B",
    marginHorizontal: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    color: "#f1c232",
    fontSize: 15,
    marginRight: 4,
  },
  rating: {
    fontWeight: "700",
    color: "#1A181B",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginVertical: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shelfBadge: {
    backgroundColor: "#eaf8ee",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  shelfText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1d8f4e",
  },
  borrowButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  borrowButton: {
    backgroundColor: "#1A181B",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  borrowButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});

export default Books;

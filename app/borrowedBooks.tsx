import { LoaderContext } from "@/context/LoaderContext"
import { getBorrowedBooks, returnBook } from "@/services/bookService"
import { useRouter } from "expo-router"
import { ChevronLeft } from "lucide-react-native"
import { useContext, useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const BorrowedBooks = () => {
  const router = useRouter();

  const [books, setBooks] = useState<any[]>([]);
  const [borrowedIds,setBorrowedIds] = useState<string[]>([]);
  const { showLoader, hideLoader } = useContext(LoaderContext);

  useEffect(() => {
    loadBooks();
  }, [])

  const loadBooks = async () => {
    try {
      showLoader();
      const userId = "USER_ID"; 
      const data = await getBorrowedBooks(userId);
      setBooks(data);
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
    } finally {
      hideLoader();
    }
  }

  const handleReturn = async (docId: string) => {
    await returnBook(docId);
    setBooks(prev => prev.filter(book => book.id !== docId));
  }

  return (  
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={20} color="#1A181B" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Borrowed Books</Text>
            <Text style={styles.subheaderText}>Manage your borrowed books and check their borrowing status.</Text>
          </View>
        </View>

        <View style={styles.booksContainer}>
          {books.map(book => (
            <TouchableOpacity 
              key={book.id}
              style={styles.bookCard}
              onPress={() => {
                router.push({
                  pathname: "/bookDetails",
                  params: { 
                    id: book.bookId, 
                  },
                });
              }}
            >
              <Image 
                source={
                  book.image
                    ? { uri: book.image }
                    : require("../assets/books/book_2.jpg")
                }
                style={styles.bookCover}
              />
              <View style={styles.bookContent}>
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.bookAuthor} numberOfLines={1}>
                  {book.author}
                </Text>
                <View style={styles.middleRow}>
                  <View>
                    <Text style={styles.categoryRow}>
                      {book.subject}
                    </Text>
                  </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.buttonContainer}>
                  <View style={styles.borrowButtonContainer}>
                    <TouchableOpacity
                      style={styles.borrowButton}
                      disabled={borrowedIds.includes(book.id.toString())}
                      onPress={() => handleReturn(book.id)}
                    >
                      <Text style={styles.borrowButtonText}>Return</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
    paddingRight: 20,
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
  booksContainer: {
    marginTop: 25,
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
})

export default BorrowedBooks
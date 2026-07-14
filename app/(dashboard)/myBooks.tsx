import { db } from "@/services/firebase";
import { useFocusEffect, useRouter } from "expo-router"
import { addDoc, collection, deleteDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { BookMarked, Pen, Plus, Trash2, Upload } from "lucide-react-native";
import { useCallback, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const MyBooks = () => {
  const router = useRouter();
  const [draftBooks, setDraftBooks] = useState<any[]>([]);
  const [publishedBooks, setPublishedBooks] = useState<any[]>([]);
  const isEmpty = 
      draftBooks.length === 0 && 
      publishedBooks.length === 0;

  useFocusEffect(
    useCallback(() => {
      getDraftBooks();
      getPublishedBooks();
    }, [])
  );

  const getDraftBooks = async () => {
    try {
      const snapshot = await getDocs(collection(db, "drafts"));

      const books = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      setDraftBooks(books);

    } catch (error) {
      console.error("Error fetching draft books:", error);
    }
  }

  const getPublishedBooks = async () => {
    try {
      const snapshot = await getDocs(collection(db, "published"));

      const books = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      setPublishedBooks(books);

    } catch (error) {
      console.error("Error fetching published books:", error);
    }
  }

  const publishDraft = async (bookId: string) => {
    try {
      const draftRef = doc(db, "drafts", bookId);

      const draftSnap = await getDoc(draftRef);

      if (!draftSnap.exists()) {
        Alert.alert("Error", "Book not found.");
        return;
      }

      const bookData = draftSnap.data();

      await addDoc(collection(db, "published"), bookData);

      await deleteDoc(draftRef);

      Alert.alert("Success", "Book published successfully!");

      await getDraftBooks();
      await getPublishedBooks();

    } catch (error) {
      console.error("Error publishing draft:", error);
      Alert.alert("Error", "Failed to publish draft.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>

        <View style={styles.myBooksHeader}>
          <View>
            <Text style={styles.headerText}>My Books</Text>
            <Text style={styles.subheaderText}>Manage your personal library</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push("/manageBook")}>
            <Plus size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {isEmpty ? (
          <View style={styles.emptyState}>
            <BookMarked size={50} color="#cccccc" />
            <Text style={styles.emptyStateText}>No books in your collection</Text>
            <Text style={styles.emptyStateSubtext}>Add your own book manuscript by clicking the plus icon at the top right</Text>
          </View>
        ) : (
          <View style={styles.myBookContainer}>

            <View style={styles.draftsContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Drafts</Text>
              </View>

              {draftBooks.map((book) => (
                <TouchableOpacity 
                  key={book.id}
                  style={styles.bookCard}
                  onPress={() => router.push('/bookDetails')}
                >
                  <View style={[
                    styles.bookCover,
                    { backgroundColor: book.coverColor || "#191919" }
                  ]}>
                    <View style={styles.innerBorder}>
                      <Text style={styles.previewTitle}>{book.title || 'Book Title'}</Text>
                      <Text style={styles.previewAuthor}>{book.author || 'Author'}</Text>
                    </View>
                  </View>
                  <View style={styles.bookInfo}>
                    <View>
                      <Text style={styles.bookTitle}>{book.title}</Text>
                      <Text style={styles.bookCategory}>{book.category}</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.button} onPress={() => publishDraft(book.id)}>
                        <Upload size={14} color="#999999" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => router.push('/manageBook')}>
                        <Pen size={14} color="#999999" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button}>
                        <Trash2 size={14} color="#999999" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.sectionDivider}></View>

            <View style={styles.publishedContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Published</Text>
              </View>

              {publishedBooks.map((book) => (
                <TouchableOpacity 
                  key={book.id}
                  style={styles.bookCard}
                  onPress={() => router.push('/bookDetails')}
                >
                  <View style={[
                    styles.bookCover,
                    { backgroundColor: book.coverColor || "#191919" }
                  ]}>
                    <View style={styles.innerBorder}>
                      <Text style={styles.previewTitle}>{book.title || 'Book Title'}</Text>
                      <Text style={styles.previewAuthor}>{book.author || 'Author'}</Text>
                    </View>
                  </View>
                  <View style={styles.bookInfo}>
                    <View>
                      <Text style={styles.bookTitle}>{book.title}</Text>
                      <Text style={styles.bookCategory}>{book.category}</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.button} onPress={() => router.push('/manageBook')}>
                        <Pen size={14} color="#999999" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button}>
                        <Trash2 size={14} color="#999999" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

          </View>
        )}

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
  myBooksHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A181B",
    fontFamily: "Poppins-Bold",
  },
  subheaderText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  emptyState: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#cccccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 40,
    marginTop: 40,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A181B',
  },
  emptyStateSubtext: {
    marginTop: 5,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  myBookContainer: {
    marginBottom: 20,
  },
  draftsContainer: {
    marginBottom: 15,
  },
  publishedContainer: {
    marginVertical: 15,
  },
  sectionHeader: {
    marginLeft: 10,
    marginBottom: 5,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#666666",
    fontFamily: "Poppins-Bold",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 10,
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  bookCover: {
    width: 100,
    height: 150,
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 6,
    marginRight: 14,
  },
  innerBorder: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 6,
    padding: 8,
    justifyContent: "space-between",
  },
  previewTitle: {
    textAlign: 'center',
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: 'bold',
  },
  previewAuthor: {
    color: '#F8F6F0',
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  bookInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A181B",
    marginBottom: 4,
  },
  bookCategory: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 6,
    padding: 6,
    margin: 4,
  },
})

export default MyBooks
import { useRouter } from "expo-router"
import { BookMarked, Pen, Plus, Trash2 } from "lucide-react-native";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const MyBooks = () => {
  const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        category: "Novel",
        description: "A classic novel set in the 1920s, exploring themes of wealth, love, and the American Dream.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        category: "Novel",
        description: "A powerful story about racial injustice and moral growth in the American South.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
        id: 3,
        title: "1984",
        category: "Dystopian",
        description: "A dystopian novel that delves into the dangers of totalitarianism and extreme political ideology.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        category: "Romance",
        description: "A romantic novel that explores themes of love, social class, and personal growth in 19th-century England.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    }
  ]
  const router = useRouter();
  const isEmpty = books.length === 0;

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
            {books.map((book) => (
              <TouchableOpacity 
                key={book.id}
                style={styles.bookCard}
                onPress={() => router.push('/bookDetails')}
              >
                <View style={styles.bookCover}>
                  <Image 
                    source={{ uri: book.image }} 
                    style={styles.bookImage}
                  />
                </View>
                <View style={styles.bookInfo}>
                  <View>
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.bookCategory}>{book.category}</Text>
                  </View>
                  <View style={styles.divider}></View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
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
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
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
    width: 58,
    height: 84,
    backgroundColor: '#191919',
    borderRadius: 8,
    marginRight: 14,
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "space-between",
    // height: 84,
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
    marginHorizontal: 8,
    marginVertical: 4,
  },
})

export default MyBooks
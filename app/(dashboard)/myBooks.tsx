import { Link, useRouter } from "expo-router"
import { BookMarked, Plus } from "lucide-react-native";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const MyBooks = () => {
  const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        writeAt: "2026-01-15",
        description: "A classic novel set in the 1920s, exploring themes of wealth, love, and the American Dream.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        writeAt: "2026-02-10",
        description: "A powerful story about racial injustice and moral growth in the American South.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
        id: 3,
        title: "1984",
        writeAt: "2026-03-05",
        description: "A dystopian novel that delves into the dangers of totalitarianism and extreme political ideology.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        writeAt: "2026-04-20",
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
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>{book.writeAt}</Text>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    marginVertical: 15,
    marginHorizontal: 8,
  },
  bookCard: {
    width: 120,
    marginRight: 16,
    marginBottom: 24,
  },
  bookCover: {
    width: 120,
    height: 180,
    backgroundColor: '#191919',
    borderRadius: 8,
    marginBottom: 8,
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bookInfo: {},
  bookTitle: {},
  bookAuthor: {},
  bookDescription: {},
})

export default MyBooks
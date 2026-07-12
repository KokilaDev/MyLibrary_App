import { useRouter } from "expo-router";
import { Bookmark, ChevronLeft, StarIcon } from "lucide-react-native"
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const BookDetails = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContent}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <ChevronLeft size={22} color="#1a181b" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Book Details</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Bookmark size={22} color="#999" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bookContainer}
        >

          <View style={styles.bookCover}>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f' }}
                style={styles.bookImage}
            />
          </View>

          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>The Library of Infinite Chambers</Text>
            <Text style={styles.bookAuthor}>by Jorge Luis Borges</Text>
            <View style={styles.bookStatus}>
              <View style={styles.bookCategoryContainer}>
                <Text style={styles.bookCategory}>Fantasy</Text>
              </View>
              <View style={styles.bookStatusContainer}>
                <Text style={styles.bookStatusText}>Available</Text>
              </View>
            </View>
          </View>

          <View style={styles.bookDescription}>
            <View style={styles.descriptionCard}>
              <View style={styles.ratingContainer}>
                <StarIcon size={16} color="#999" />
                <Text style={styles.ratingText}>5</Text>
              </View>
              <Text style={styles.descriptionLabel}>(1 reviews)</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionValue}>150</Text>
              <Text style={styles.descriptionLabel}>Pages</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionValue}>2026</Text>
              <Text style={styles.descriptionLabel}>Published</Text>
            </View>
          </View>

          <View style={styles.bookSynopsis}>
            <Text style={styles.synopsisTitle}>SYNOPSIS</Text>
            <Text style={styles.synopsisText}>A poetic summary of this beautiful manuscript</Text>
          </View>

          <View style={styles.bookAboutContainer}>
            <View style={styles.bookAboutCard}>
              <Text style={styles.aboutLabel}>Standard ISBN:</Text>
              <Text style={styles.aboutValue}>978-2345-78</Text>
            </View>
            <View style={styles.bookAboutCard}>
              <Text style={styles.aboutLabel}>Translation Language:</Text>
              <Text style={styles.aboutValue}>English</Text>
            </View>
            <View style={styles.bookAboutCard}>
              <Text style={styles.aboutLabel}>Total Library Copies:</Text>
              <Text style={styles.aboutValue}>1 volumes</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.borrowButton}>
              <Text style={styles.borrowButtonText}>Borrow Book</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.readButton} onPress={() => router.push("/readingArea")}>
              <Text style={styles.readButtonText}>Continue Reading</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a181b',
  },
  bookContainer: {
    paddingBottom: 100,
  },
  bookCover: {
    marginTop: 20,
    margin: 'auto',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 220,
    backgroundColor: '#191919',
    borderRadius: 8,
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bookInfo: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a181b',
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  bookStatus: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 15,
  },
  bookCategoryContainer: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  bookCategory: {
    fontSize: 12,
    color: '#1a181b',
  },
  bookStatusContainer: {
    backgroundColor: '#eaf8ee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  bookStatusText: {
    fontSize: 12,
    color: '#1a181b',
  },
  bookDescription: {
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  descriptionCard: {
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a181b',
  },
  descriptionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a181b',
  },
  descriptionLabel: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 18,
    alignSelf: "stretch",
  },
  bookSynopsis: {
    marginTop: 5,
    marginHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '80%',
  },
  synopsisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a181b',
    marginBottom: 5,
  },
  synopsisText: {
    fontSize: 14,
    color: '#1a181b',
  },
  bookAboutContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bookAboutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  aboutLabel: {
    fontSize: 14,
    color: '#1a181b',
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a181b',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  borrowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a181b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  readButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1a181b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  borrowButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  readButtonText: {
    color: '#1a181b',
    fontWeight: 'bold',
  },
})

export default BookDetails
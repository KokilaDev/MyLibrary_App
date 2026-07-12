import { BookOpen, Search } from "lucide-react-native";
import { ScrollView, StyleSheet, View, Text, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SearchPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Search Book Catalog</Text>
            <Text style={styles.headerSubtitle}>Instant filtered access to all manuscripts</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#999999" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search for titles, authors, genres..." 
            placeholderTextColor="#999999"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.emptyState}>
          <View style={styles.emptyStateIcon}>
            <BookOpen size={50} color="#999999" />
          </View>
          <Text style={styles.emptyStateText}>Ready to Browse</Text>
          <Text style={styles.emptyStateSubtext}>Begin typing to crawl through titles, old manuscripts, authors, or specialized categories.</Text>
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
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A181B",
    fontFamily: "Poppins-Bold",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 24,
    shadowColor: '#999999',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#999999',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
    marginTop: 40,
  },
  emptyStateIcon: {
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    padding: 20,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A181B',
  },
  emptyStateSubtext: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
});

export default SearchPage
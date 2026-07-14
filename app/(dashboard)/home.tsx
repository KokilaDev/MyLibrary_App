import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell, Library, Bookmark, Sparkles, BookOpen, Atom, GraduationCap, ChevronRight } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import { getBooks } from '@/services/bookService';
import { LoaderContext } from '@/context/LoaderContext';

interface Book {
  id: number;
  title: string;
  download_count: number;
  authors: { name: string }[];
  subjects: string[];
  formats: {
    "image/jpeg"?: string;
    [key: string]: string | undefined;
  };
}

const Home = () => {
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const { showLoader, hideLoader } = useContext(LoaderContext);

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

  const topDownloadedBooks = [...books]
    .sort((a: any, b: any) => b.download_count - a.download_count)
    .slice(0, 5);

  const recentlyAddedBooks = [...books]
    .sort((a: any, b: any) => b.id - a.id)
    .slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.username}>Kokila Dewmini</Text>
          </View>
          <View style={styles.headerActions}>
            <Link href="/notifications" asChild>
              <TouchableOpacity style={styles.notificationBtn}>
                <Bell size={20} color="#999999" />
                <View style={styles.badge} />
              </TouchableOpacity>
            </Link>
            <Link href="/profile" asChild>
              <TouchableOpacity style={styles.notificationBtn}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }} 
                  style={styles.avatar} 
                />
              </TouchableOpacity>
            </Link>
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

        <View style={styles.buttonContainer}>
          <Link href="/category" asChild>
            <TouchableOpacity style={styles.navButton}>
              <View style={styles.navButtonIcon}>
                <Library size={24} color="#323232" />
              </View>

              <View style={styles.navTextContainer}>
                <Text style={styles.navButtonTitle}>Categories</Text>
                <Text style={styles.navButtonSubtitle}>
                    Browse Genres
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/borrowedBooks" asChild>
            <TouchableOpacity style={styles.navButton}>
              <View style={styles.navButtonIcon}>
                <Bookmark size={24} color="#323232" />
              </View>

              <View style={styles.navTextContainer}>
                <Text style={styles.navButtonTitle}>Borrowed Books</Text>
                <Text style={styles.navButtonSubtitle}>
                    Borrowed list
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        <TouchableOpacity 
          style={styles.continueCard} 
          onPress={() => {router.push("/readingArea")}}
        >
          <View style={styles.continueTextContent}>
            <Text style={styles.continueLabel}>CONTINUE READING</Text>
            <Text style={styles.continueTitle}>The Shadow of Dark Oaks</Text>
            <Text style={styles.continueAuthor}>Marguerite Osborne</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65% Completed</Text>
          </View>
          <View style={styles.miniCover}>
            <Image 
              source={ require("../../assets/books/book_1.jpg") } 
              style={styles.miniCoverImage}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Curations</Text>
          <Link href="/(dashboard)/books" asChild>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {recentlyAddedBooks.map((book) => (
            <TouchableOpacity 
              key={book.id}
              style={styles.featuredBook}
              onPress={() => {
                router.push({
                  pathname: "/bookDetails",
                  params: { id: book.id },
                });
              }}
            >
              <View style={styles.mockCoverLarge}>
                <Image 
                  source={{
                    uri: book.formats["image/jpeg"]
                  }} 
                  style={styles.mockCoverImage}
                />
              </View>
              <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.authors[0]?.name ?? "Unknown Author"}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <Link href="/category" asChild>
            <TouchableOpacity>
              <Text style={styles.seeAll}>All</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.categoryCardContainer}>
          <View style={styles.categoryCard}>
            <View style={styles.categoryIcon}>
              <Sparkles size={24} color="#323232" />
            </View>
            <View>
              <Text style={styles.categoryTitle}>Fantasy</Text>
              <Text style={styles.categoryCount}>14 Books</Text>
            </View>
            <ChevronRight size={20} color="#7A7A7A" />
          </View>
          <View style={styles.categoryCard}>
            <View style={styles.categoryIcon}>
              <BookOpen size={24} color="#323232" />
            </View>
            <View>
              <Text style={styles.categoryTitle}>Novel</Text>
              <Text style={styles.categoryCount}>22 Books</Text>
            </View>
            <ChevronRight size={20} color="#7A7A7A" />
          </View>
          <View style={styles.categoryCard}>
            <View style={styles.categoryIcon}>
              <Atom size={24} color="#323232" />
            </View>
            <View>
              <Text style={styles.categoryTitle}>Science</Text>
              <Text style={styles.categoryCount}>9 Books</Text>
            </View>
            <ChevronRight size={20} color="#7A7A7A" />
          </View>
          <View style={styles.categoryCard}>
            <View style={styles.categoryIcon}>
              <GraduationCap size={24} color="#323232" />
            </View>
            <View>
              <Text style={styles.categoryTitle}>Education</Text>
              <Text style={styles.categoryCount}>18 Books</Text>
            </View>
            <ChevronRight size={20} color="#7A7A7A" />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Added Books</Text>
        </View>

        <View style={styles.recentlyAddedContainer}>
          {topDownloadedBooks.map((book) => (
            <TouchableOpacity 
              key={book.id} 
              style={styles.recentBookCard}
              onPress={() => {
                router.push({
                  pathname: "/bookDetails",
                  params: { id: book.id },
                })
              }}
            >
              <Image
                source={{ uri: book.formats["image/jpeg"] }}
                style={styles.recentBookCover}
              />
              <View style={styles.recentBookContent}>
                <Text style={styles.recentBookTitle} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.recentBookAuthor}>
                  {book.authors[0]?.name ?? "Unknown Author"}
                </Text>
                <View style={styles.bottomRow}>
                  <Text style={styles.shelfText}>{book.download_count.toLocaleString()} Downloads</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a181b',
    fontFamily: 'Poppins-SemiBold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7f7f7f',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#cccccc',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 28,
  },
  navButton: {
    width: '48%',
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },
  navButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  navTextContainer: {
    flex: 1,
  },
  navButtonTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A181B",
  },
  navButtonSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#7A7A7A",
  },
  continueCard: {
    backgroundColor: '#191919',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  continueTextContent: {
    flex: 1,
    marginRight: 12,
  },
  continueLabel: {
    fontSize: 9,
    color: '#b2b2b2',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  continueTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 6,
  },
  continueAuthor: {
    fontSize: 11,
    color: '#cccccc',
    marginTop: 2,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#b2b2b2',
    borderRadius: 2,
  },
  progressText: {
    color: '#b2b2b2',
    fontSize: 10,
    marginTop: 4,
  },
  miniCover: {
    width: 60,
    height: 85,
    backgroundColor: '#4c4c4c',
    borderRadius: 6,
  },
  miniCoverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191919',
  },
  seeAll: {
    color: '#7f7f7f',
    fontSize: 13,
  },
  carousel: {
    flexDirection: 'row',
    marginBottom: 28,
  },
  featuredBook: {
    width: 120,
    marginRight: 16,
  },
  mockCoverLarge: {
    width: 120,
    height: 170,
    backgroundColor: '#191919',
    borderRadius: 8,
    marginBottom: 8,
  },
  mockCoverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#191919',
  },
  bookAuthor: {
    fontSize: 11,
    color: '#999999',
  },
  categoryCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  categoryCard: {
    flexDirection: "row",
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
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
  categoryIcon: {
    width: 45,
    height: 45,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A181B",
  },
  categoryCount: {
    marginTop: 4,
    fontSize: 12,
    color: "#7A7A7A",
  },
  recentlyAddedContainer: {
    marginBottom: 5,
  },
  recentBookCard: {
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
  recentBookCover: {
    width: 58,
    height: 84,
    borderRadius: 8,
    marginRight: 14,
  },
  recentBookContent: {
    flex: 1,
    justifyContent: "space-between",
    height: 84,
  },
  recentBookTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A181B",
  },
  recentBookAuthor: {
    marginTop: 2,
    fontSize: 14,
    color: "#666",
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  shelfBadge: {
    backgroundColor: "#e5e5e5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  shelfText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#7A7A7A",
  },
});

export default Home
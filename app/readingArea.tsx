import { LoaderContext } from "@/context/LoaderContext";
import { getBookById } from "@/services/bookService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, CircleCheck, MoonIcon, SunIcon } from "lucide-react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReadingArea = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { showLoader, hideLoader } = useContext(LoaderContext);

  const scrollRef = useRef<ScrollView>(null);

  const [book, setBook] = useState<any>(null);
  const [story, setStory] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    try {
      showLoader();
      console.log("Book ID:", id);
      const data = await getBookById(id as string);
      console.log("Book Data:", data);
      setBook(data);

      const textUrl = 
        data.formats["text/plain; charset=utf-8"] ||
        data.formats["text/plain; charset=us-ascii"] ||
        data.formats["text/plain"];

      if (textUrl) {
        const response = await fetch(textUrl);
        const text = await response.text();
        setStory(text);
      }
      
    } catch (error) {
      console.error("Error fetching book:", error);
    } finally {
      hideLoader();
    }
  }

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const value = contentOffset.y / (contentSize.height - layoutMeasurement.height);

    setProgress(
      Math.min(Math.max(value, 0), 1)
    );
  }
  
  return (
    <SafeAreaView 
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? "#1A181B" : "#fff"}
      ]}>
      <View style={styles.scrollContent}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <ChevronLeft size={20} color={isDarkMode ? "#1A181B" : "#999"} />
          </TouchableOpacity>
          <View>
            <Text 
              style={[
                styles.headerText,
                {color: isDarkMode ? "#fff" : "#1A181B"}
              ]}
            >
              {book?.title ?? "Book Title"}
            </Text>
            <Text 
              style={[
                styles.subheaderText,
                {color: isDarkMode ? "#fff" : "#1A181B"}
              ]}
            >
              {book?.authors[0]?.name ?? "Author Name"}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode
              ? (<SunIcon size={20} color="#1A181B" />)
              : (<MoonIcon size={20} color="#1A181B" />)
            }
          </TouchableOpacity>
        </View>

        <View style={styles.subheader}>

          <Text 
            style={[
              styles.fontIcon,
              {color: isDarkMode ? "#fff" : "#1A181B"}
            ]}
          >
            T
          </Text>

          <Text 
            style={[
              styles.fontSizeText,
              {color: isDarkMode ? "#fff" : "#1A181B"}
            ]}
          >
            Font Size
          </Text>

          <View 
            style={[
              styles.fontSizeButtons,
              {backgroundColor: isDarkMode ? "#1A181B" : "#f2f2f2"}
            ]}
          >

            <TouchableOpacity 
              style={[
                styles.fontSizeButton,
                {backgroundColor: isDarkMode ? "#1A181B" : "#f2f2f2"}
              ]}
              onPress={() => setFontSize(14)}
            >
              <Text style={styles.fontSizeButtonText}>sm</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.fontSizeButton,
                {backgroundColor: isDarkMode ? "#1A181B" : "#f2f2f2"}
              ]}
              onPress={() => setFontSize(16)}
            >
              <Text style={styles.fontSizeButtonText}>md</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.fontSizeButton,
                {backgroundColor: isDarkMode ? "#1A181B" : "#f2f2f2"}
              ]}
              onPress={() => setFontSize(18)}
            >
              <Text style={styles.fontSizeButtonText}>lg</Text>
            </TouchableOpacity>

          </View>

        </View>

        <ScrollView
          ref={scrollRef} 
          style={styles.readingContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.pageContent}>
            <Text
              style={[
                styles.storyText,
                { fontSize, color: isDarkMode ? "#fff" : "#1A181B" }
              ]}
            >
              {story || "Loading story..."}
            </Text>
          </View>

          <View style={styles.pageBottom}>
            <CircleCheck size={20} color={isDarkMode ? "#fff" : "#1A181B"} />
            <Text 
              style={[
                styles.bottomText,
                {color: isDarkMode ? "#fff" : "#1A181B"}
              ]}
            >
              End of excerpt preview
            </Text>
            <Text 
              style={[
                styles.subBottomText,
                {color: isDarkMode ? "#fff" : "#1A181B"}
              ]}
            >
              You have completed 100% of this vintage summary snippet.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {Math.round(progress * 100)}% Completed
          </Text>
          <View style={styles.progressBackground}>
            <View style={[styles.progressBar, { width: `${Math.round(progress)}%` }]} />
          </View>
          <Text style={styles.subFooterText}>Reading</Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flex: 1,
    padding: 20,
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
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a181b',
  },
  subheaderText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  fontIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a181b',
  },
  fontSizeText: {
    fontSize: 14,
    color: '#666',
  },
  fontSizeButtons: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontSizeButton: {
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  fontSizeButtonText: {
    fontSize: 14,
    color: '#1a181b',
  },
  readingContent: {
    flex: 1,
    marginBottom: 15,
  },
  pageContent: {
    paddingBottom: 20,
  },
  storyText: {
    lineHeight: 20,
  },
  pageBottom: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  bottomText: {
    fontSize: 14,
    color: '#1a181b',
    marginTop: 8,
  },
  subBottomText: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
  footer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerText: {
    fontSize: 14,
    color: '#1a181b',
  },
  progressBackground: {
    width: '40%',
    height: 6,
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: 6,
    backgroundColor: '#1A181B',
    borderRadius: 10,
  },
  subFooterText: {
    fontSize: 12,
    color: '#666',
  }
})

export default ReadingArea;
import { useRouter } from "expo-router";
import { Check, ChevronLeft, Redo2, Undo2, Upload } from "lucide-react-native";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const ManageBook = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContent}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={22} color="#1a181b" />
          </TouchableOpacity>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Undo2 size={22} color="#999" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Redo2 size={22} color="#999" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Check size={22} color="#999" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Upload size={22} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#1a181b"
            style={styles.titleInput}
          />
        </View>

        <ScrollView>
          <TextInput
            placeholder="Write your story here..."
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            style={styles.storyInput}
          />
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
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  titleInput: {
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: "#1a181b",
  },
  storyInput: {
    padding: 10,
    fontSize: 16,
    color: "#191919",
    minHeight: 200,
  }
});

export default ManageBook
import { useRouter } from "expo-router";
import { Check, ChevronLeft, Redo2, Undo2, Upload } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const ManageBook = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState('Novel');
  const [coverColor, setCoverColor] = useState('#3D2B1F');
  const [story, setStory] = useState("");

  const COLORS = [
    "#0B1F3A",
    "#014421",
    "#4A0E1A",
    "#3C1361",
    "#111111",
    "#4E342E",
  ];

  const handleSave = () => {
    if (!title || !story) {
      Alert.alert('Error', 'Title and Story are required fields.');
      return;
    }
    Alert.alert('Success', 'Book catalog updated successfully!');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#3D2B1F" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Add Books</Text>
            <Text style={styles.subHeaderTitle}>Make your book collection even better</Text>
          </View>
        </View>

        <View style={styles.form}>

          <View>
            <Text style={styles.coverLabel}>Cover Styling</Text>
            <View style={styles.coverPreviewContainer}>
              <View style={[styles.coverPreview, { backgroundColor: coverColor }]}>
                <Text style={styles.previewTitle}>{title || 'Book Title'}</Text>
                <Text style={styles.previewAuthor}>{isbn || 'ISBN'}</Text>
              </View>
              <View style={styles.colorPickerContainer}>
                <Text style={styles.pickerLabel}>Choose Cover Leather Color</Text>
                <View style={styles.colorRow}>
                  {COLORS.map(color => (
                    <TouchableOpacity
                      key={color}
                      onPress={() => setCoverColor(color)}
                      style={[
                        styles.colorOption,
                        { backgroundColor: color },
                        coverColor === color && styles.colorOptionActive
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Book Title *</Text>
            <TextInput
              placeholderTextColor="#8E9680"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <TextInput
              placeholderTextColor="#8E9680"
              style={styles.input}
              value={category}
              onChangeText={setCategory}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ISBN</Text>
            <TextInput
              placeholder="XXX-X-XX-XXXXXX-X"
              placeholderTextColor="#8E9680"
              style={styles.input}
              value={isbn}
              onChangeText={setIsbn}
            />
          </View>

          <View style={styles.storyInputGroup}>
            <Text style={styles.storyLabel}>Story *</Text>
            <TextInput
              value={story}
              onChangeText={setStory}
              multiline
              scrollEnabled
              textAlignVertical="top"
              style={styles.storyInput}
              placeholder="Write your story here..."
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save as Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.publishButton} onPress={handleSave}>
              <Text style={styles.publishButtonText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a181b',
  },
  subHeaderTitle: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    gap: 15,
  },
  coverLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a181b',
    marginBottom: 10,
  },
  coverPreviewContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#3D2B1F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  coverPreview: {
    width: 90,
    height: 130,
    borderRadius: 6,
    padding: 10,
    justifyContent: 'space-between',
  },
  previewTitle: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: 'bold',
  },
  previewAuthor: {
    color: '#F8F6F0',
    fontSize: 8,
    fontStyle: 'italic',
  },
  colorPickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorOption: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  colorOptionActive: {
    borderColor: '#D4AF37',
    transform: [{ scale: 1.1 }],
  },
  inputGroup: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a181b',
  },
  input: {
    backgroundColor: '#e5e5e5',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#3D2B1F',
  },
  storyInputGroup: {
    width: '100%',
  },
  storyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a181b',
  },
  storyInput: {
    backgroundColor: "#e5e5e5",
    borderRadius: 12,
    height: 400,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#3D2B1F",
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  saveButton: {
    backgroundColor: '#e5e5e5',
    width: '48%',
    height: 52,
    borderWidth: 2,
    borderColor: '#1A181B',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A181B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#1A181B',
    fontSize: 16,
    fontWeight: '600',
  },
  publishButton: {
    backgroundColor: '#1A181B',
    width: '48%',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A181B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginTop: 10,
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default ManageBook
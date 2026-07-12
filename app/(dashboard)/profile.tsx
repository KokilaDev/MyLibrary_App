import { Link, useRouter } from "expo-router"
import { ChevronRight, Clock, LogOut, OptionIcon, Settings } from "lucide-react-native"
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>

        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <Image
                source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" }}
                style={styles.profileImage}
            />
            <View style={styles.activeStatus} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>Kokila Dewmini</Text>
            <Text style={styles.email}>kokila@gmail.com</Text>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>Dew</Text>
            </View>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.statusCard}>
            <Text style={styles.statusValue}>4</Text>
            <Text style={styles.statusText}>Read</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.statusCard}>
            <Text style={styles.statusValue}>2</Text>
            <Text style={styles.statusText}>Borrowed</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.statusCard}>
            <Text style={styles.statusValue}>3</Text>
            <Text style={styles.statusText}>Favourites</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionCard} onPress={() => {router.push("/borrowHistory")}}>
            <Clock size={20} color="#999999" style={styles.optionIcon}/>
            <Text style={styles.optionText}>Borrow & Timeline History</Text>
            <ChevronRight size={20} color="#999999" style={styles.arrow}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => {router.push("/settings")}}>
            <Settings size={20} color="#999999" style={styles.optionIcon}/>
            <Text style={styles.optionText}>Settings & Preferences</Text>
            <ChevronRight size={20} color="#999999" style={styles.arrow}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => {router.push("/")}}>
            <LogOut size={20} color="#999999" style={styles.optionIcon}/>
            <Text style={styles.optionText}>Logout</Text>
            <ChevronRight size={20} color="#999999" style={styles.arrow}/>
          </TouchableOpacity>
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
  profileHeader: {
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ccc',
  },
  activeStatus: {
    position: 'absolute',
    bottom: 2,
    right: 115,
    width: 22,
    height: 22,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A181B',
    fontFamily: 'Poppins-Bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  usernameContainer: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A181B',
    fontFamily: 'Poppins-Regular',
  },
  statusContainer: {
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
  statusCard: {
    alignItems: 'center',
  },
  statusValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A181B',
    fontFamily: 'Poppins-Bold',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  divider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  optionsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1A181B',
    fontFamily: 'Poppins-Regular',
  },
  arrow: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
})

export default Profile
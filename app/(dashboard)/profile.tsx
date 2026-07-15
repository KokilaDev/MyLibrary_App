import { UserProfileData } from "@/constants/data";
import { LoaderContext } from "@/context/LoaderContext";
import { auth, db } from "@/services/firebase";
import { useRouter } from "expo-router"
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ChevronRight, Clock, LogOut, Settings } from "lucide-react-native"
import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const [userData, setUserData] = useState<UserProfileData | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      showLoader();
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.data() as UserProfileData);
      }
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      hideLoader();
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

   const getInitials = (name: string) => {
    const words = name.split(" ");

    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }

    return words[0][0].toUpperCase();
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>

        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            {/* <Image
                source={{ uri: userData?.profileImage }}
                style={styles.profileImage}
            /> */}
            {/* <UserIcon size={100} color="#999999" style={styles.profileImage}/> */}
            <Text style={[styles.profileImage, {textAlign: 'center', lineHeight: 100, fontSize: 36, fontWeight: 'bold', color: '#fff', backgroundColor: '#999999', borderRadius: 50}]}>
              {userData?.name ? getInitials(userData.name) : "U"}
            </Text>
            <View style={styles.activeStatus} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{userData?.name || "User Name"}</Text>
            <Text style={styles.email}>{userData?.email || "user@example.com"}</Text>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{userData?.username || "username"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.statusCard}>
            <Text style={styles.statusValue}>{userData?.readBooks || 0}</Text>
            <Text style={styles.statusText}>Read</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.statusCard}>
            <Text style={styles.statusValue}>{userData?.borrowedBooks || 0}</Text>
            <Text style={styles.statusText}>Borrowed</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.statusCard}>
            <Text style={styles.statusValue}>{userData?.favourites || 0}</Text>
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
          <TouchableOpacity style={styles.optionCard} onPress={handleLogout}>
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
    right: 130,
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
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth, 
    email, 
    password
  );
  await updateProfile(userCredentials.user, { displayName: name });

  await setDoc(doc(db, "users", userCredentials.user.uid), {
    name: name,
    username: name.split(" ")[0],
    email: email,
    roles: role,
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    readBooks: 0,
    borrowedBooks: 0,
    favourites: 0,
    createdAt: new Date(),
  })

  return userCredentials.user;
}

export const login = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(
    auth, 
    email, 
    password
  );
}

export const logout = async () => {
  await signOut(auth);
  return;
}
import { addDoc, collection, updateDoc, doc, getDocs, query, serverTimestamp, where, Timestamp, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export const getBooks = async (search = "") => {
  try {
    const url = search
      ? `https://gutendex.com/books?search=${search}`
      : "https://gutendex.com/books";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export const getBookById = async (id: string) => {
  try {
    const response = await fetch(`https://gutendex.com/books/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch book by ID");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
}

export const borrowBook = async (
  book: any,
  userId: string
) => {
  const borrowDate = Timestamp.now();

  const dueDate = Timestamp.fromDate(
    new Date(
      Date.now() + 14 * 24 * 60 * 60 * 1000
    )
  );

  await addDoc(collection(db, "borrowed"), {
    userId,
    bookId: book.id,
    title: book.title,
    author: book.authors[0]?.name ?? "Unknown",
    image: book.formats["image/jpeg"] ?? "",
    borrowedDate: borrowDate,
    dueDate,
    returned: false,
    returnedDate: null,
  });
}

export const getBorrowedBooks = async (userId: string) => {
  const q = query(
    collection(db, "borrowed"), 
    where("userId", "==", userId),
    where("returned", "==", false),
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export const returnBook = async (docId: string) => {
  await updateDoc(
    doc(db, "borrowed", docId),
    {
      returned: true,
      returnedDate: Timestamp.now(),
    }
  );
}

export const getBorrowHistory = async (userId: string) => {
  const q = query(
    collection(db, "borrowed"),
    where("userId", "==", userId),
    orderBy("borrowedDate", "desc")
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
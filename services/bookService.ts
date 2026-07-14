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
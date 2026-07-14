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
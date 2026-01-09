import BookCard from "@/components/BookCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IBook } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  // Validate BASE_URL is defined
  if (!BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_BASE_URL environment variable is not defined. Please configure it in your .env file."
    );
  }

  let books: IBook[] = [];

  try {
    // Fetch books from API
    const response = await fetch(`${BASE_URL}/api/books`, {
      cache: "no-store",
    });

    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Failed to fetch books: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    // Parse JSON response
    const data = await response.json();

    // Validate books property exists and is an array
    if (!data.books || !Array.isArray(data.books)) {
      console.error("Invalid API response structure:", data);
      throw new Error(
        "API response does not contain a valid books array. Expected { books: [] }"
      );
    }

    books = data.books;
  } catch (error) {
    console.error("Error fetching books:", error);
    // Return empty array as safe default instead of crashing the page
    books = [];
  }

  return (
    <section>
      <h1 className="text-center p-4">The Hub for Knowledge Base</h1>
      <p className="text-center mt-5 p-2">
        Math, Machine Learning, Data Science and more, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Books</h3>
        <ul className="events">
          {books && books.length > 0 ? (
            books.map((book: IBook) => (
              <li key={book._id || book.slug || book.isbn || book.title}>
                <BookCard
                  image={book.coverImageUrl}
                  title={book.title}
                  slug={book.slug}
                  author={
                    Array.isArray(book.authors) && book.authors.length > 0
                      ? book.authors[0]
                      : "Unknown Author"
                  }
                  genre={
                    Array.isArray(book.tags) && book.tags.length > 0
                      ? book.tags[0]
                      : "Uncategorized"
                  }
                  publishedYear={book.publishedYear}
                  rating={book.rating}
                  description={book.description}
                />
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 py-8">
              No books available at the moment.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default page;

import BookCard from "@/components/BookCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IBook } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  const response = await fetch(`${BASE_URL}/api/books`, {
    cache: "no-store",
  });
  const { books } = await response.json();

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
          {books &&
            books.length > 0 &&
            books.map((book: IBook) => (
              <li key={book.title}>
                <BookCard
                  image={book.coverImageUrl}
                  title={book.title}
                  slug={book.slug}
                  author={book.authors[0]}
                  genre={book.tags[0]}
                  publishedYear={book.publishedYear}
                  rating={book.rating}
                  description={book.description}
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default page;

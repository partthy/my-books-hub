import BookCard from "@/components/BookCard";
import ExploreBtn from "@/components/ExploreBtn";
import { books } from "@/lib/constants";

const page = () => {
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
          {books.map((book) => (
            <li key={book.title}>
              <BookCard {...book} />
            </li>
          ))}
        </ul>
      </div>
      
    </section>
  );
}

export default page


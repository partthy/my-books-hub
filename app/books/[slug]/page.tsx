import { notFound } from "next/navigation";
import Image from "next/image";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const BookDetailItem = ({
  icon,
  alt,
  label,
  labelDesc,
}: {
  icon: string;
  alt: string;
  label: string;
  labelDesc: string;
}) => {
  return (
    <div className="flex gap-2 text-gray-400 mt-2">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p className="font-medium text-gray-300">{labelDesc}:</p>
      <p>{label}</p>
    </div>
  );
};

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/books/${slug}`, {
    cache: "no-store",
  });

  if (!request.ok) return notFound();

  const { data: book } = await request.json();

  if (!book) return notFound();
  return (
    <section id="book">
      <div className="header">
        <h1 className="p-2">Book Details</h1>
      </div>
      <div className="details">
        <div className="content flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <Image
              src={book.coverImageUrl}
              alt="Book Image"
              width={600}
              height={600}
              className="banner mt-4 rounded-2xl w-full"
            />
          </div>
          <section className="flex-col-gap-2 lg:w-2/3">
            <p className="mt-2 text-2xl">{book.title}</p>
            <h2 className="mt-4 text-2xl">Book Description</h2>
            <p className="mt-2">{book.description}</p>
            <div className="flex-row-gap-2 mt-4">
              <BookDetailItem
                icon="/icons/audience.svg"
                alt="author"
                labelDesc="Authors"
                label={book.authors}
              />
            </div>
            <div className="flex flex-row gap-4">
              <BookDetailItem
                icon="/icons/publisher.svg"
                alt="author"
                labelDesc="Publisher"
                label={book.publisher}
              />
              <BookDetailItem
                icon="/icons/calendar.svg"
                alt="author"
                labelDesc="Year"
                label={book.publishedYear}
              />
            </div>
            <div className="flex flex-row gap-4">
              <BookDetailItem
                icon="/icons/pages.svg"
                alt="author"
                labelDesc="Pages"
                label={book.pageCount}
              />
              <BookDetailItem
                icon="/icons/format.svg"
                alt="author"
                labelDesc="Format"
                label={book.format}
              />
            </div>
            <div className="flex flex-row gap-4">
              <BookDetailItem
                icon="/icons/isbn.svg"
                alt="author"
                labelDesc="ISBN"
                label={book.isbn}
              />
              <BookDetailItem
                icon="/icons/edition.svg"
                alt="author"
                labelDesc="Edition"
                label={book.edition}
              />
            </div>
            <div className="flex-row-gap-2">
              <BookDetailItem
                icon="/icons/star3.svg"
                alt="author"
                labelDesc="Rating"
                label={book.rating}
              />
            </div>
            <div className="flex-row-gap-2">
              <BookDetailItem
                icon="/icons/tags.svg"
                alt="author"
                labelDesc="tags"
                label={book.tags}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default BookDetailsPage;

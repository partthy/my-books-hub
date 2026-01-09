import Link from "next/link";
import Image from "next/image";

interface Props {
  image: string;
  title: string;
  slug: string;
  author: string;
  genre: string;
  publishedYear: string;
  rating: number;
  description: string;
}

const BookCard = ({
  title,
  image,
  slug,
  author,
  genre,
  publishedYear,
  rating,
}: Props) => {
  return (
    <Link href={`/books/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />
      <p className="title">{title}</p>
      <div className="flex flex-row gap-2">
        <Image src="/icons/mode.svg" alt="author" width={14} height={14} />
        <p>{author}</p>
      </div>
      <div className="datetime">
        <div>
          <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
          <p>{publishedYear}</p>
        </div>
        <div>
          <Image src="/icons/audience.svg" alt="genre" width={14} height={14} />
          <p>{genre}</p>
        </div>
        <div>
          <Image src="/icons/star3.svg" alt="rating" width={14} height={14} />
          <p>{rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;

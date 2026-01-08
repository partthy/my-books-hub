export type BookItem = {
  image: string
  title: string
  slug: string
  author: string
  genre: string
  publishedYear: string
  rating: number
  description: string
}


export const books: BookItem[] = [
  {
    slug: "atomic-habits",
    image: "/images/event1.png",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    publishedYear: "2018",
    rating: 4.8,
    description: "Tiny changes, remarkable results",
  },
  {
    slug: "the-lean-startup",
    image: "/images/event2.png",
    title: "The Lean Startup",
    author: "Eric Ries",
    genre: "Business",
    publishedYear: "2011",
    rating: 4.6,
    description: "How today's entrepreneurs use continuous innovation",
  },
  {
    slug: "sapiens",
    image: "/images/event3.png",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    publishedYear: "2011",
    rating: 4.7,
    description: "A brief history of humankind",
  },
  {
    slug: "clean-code",
    image: "/images/event4.png",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Technology",
    publishedYear: "2008",
    rating: 4.9,
    description: "A handbook of agile software craftsmanship",
  },
  {
    slug: "thinking-fast-slow",
    image: "/images/event5.png",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Psychology",
    publishedYear: "2011",
    rating: 4.5,
    description: "The two systems that drive the way we think",
  },
  {
    slug: "the-alchemist",
    image: "/images/event6.png",
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    publishedYear: "1988",
    rating: 4.7,
    description: "A journey to discover one's destiny",
  },
  
];

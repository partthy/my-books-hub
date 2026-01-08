import { Schema, model, models, Document } from "mongoose";

// TypeScript interface for Book document
export interface IBook extends Document {
  title: string;
  slug: string;
  description: string;
  authors: string[];
  publishedYear: string;
  tags: string[];
  language: string;
  publisher: string;
  isbn: string;
  pageCount: number;
  format: string;
  edition: string;
  rating: number;
  coverImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

// Book schema definition
const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    authors: {
      type: [String],
      required: [true, "At least one author is required"],
      validate: {
        validator: (v: string[]) => v && v.length > 0,
        message: "Authors array cannot be empty",
      },
    },
    publishedYear: {
      type: String,
      required: [true, "Published year is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "At least one tag is required"],
      validate: {
        validator: (v: string[]) => v && v.length > 0,
        message: "Tags array cannot be empty",
      },
    },
    language: {
      type: String,
      required: [true, "Language is required"],
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, "Publisher is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      trim: true,
    },
    pageCount: {
      type: Number,
      required: [true, "Page count is required"],
      min: [1, "Page count must be at least 1"],
    },
    format: {
      type: String,
      required: [true, "Format is required"],
      trim: true,
    },
    edition: {
      type: String,
      required: [true, "Edition is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating must be between 0 and 5"],
      max: [5, "Rating must be between 0 and 5"],
    },
    coverImageUrl: {
      type: String,
      required: [true, "Cover image URL is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Pre-save hook to generate unique slug from title
BookSchema.pre("save", async function () {
  // Only generate slug if title is modified or document is new
  if (this.isModified("title") || this.isNew) {
    const baseSlug = generateSlug(this.title);
    let candidateSlug = baseSlug;
    let counter = 1;

    // Check for slug collisions and append counter if needed
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const existing = await models.Book.exists({
        slug: candidateSlug,
        _id: { $ne: this._id }, // Exclude current document
      });

      if (!existing) {
        // Unique slug found
        this.slug = candidateSlug;
        break;
      }

      // Append counter and try again
      candidateSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
});

// Create unique index on slug field
BookSchema.index({ slug: 1 }, { unique: true });

/**
 * Generates a URL-friendly slug from a title string
 * - Converts to lowercase
 * - Removes special characters
 * - Replaces spaces with hyphens
 * - Removes consecutive hyphens
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Export model, reuse existing model in development to prevent recompilation errors
const Book = models.Book || model<IBook>("Book", BookSchema);

export default Book;

import { Book } from "@/database";

import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";


// Configuration for file validation
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    // Extract the image file
    const coverImage = formData.get("coverImage") as File | null;

    let coverImageUrl = "";

    // Handle image upload if file is provided
    if (coverImage && coverImage.size > 0) {
      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(coverImage.type)) {
        return NextResponse.json(
          {
            message:
              "Invalid file type. Only JPEG, JPG, PNG, and WebP are allowed.",
          },
          { status: 400 }
        );
      }

      // Validate file size
      if (coverImage.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            message: `File size exceeds ${
              MAX_FILE_SIZE / (1024 * 1024)
            }MB limit.`,
          },
          { status: 400 }
        );
      }

      // Generate unique filename: timestamp-randomstring-originalname
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = path.extname(coverImage.name);
      const fileName = `${timestamp}-${randomString}${fileExtension}`;

      // Convert file to buffer
      const bytes = await coverImage.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Define upload path
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const filePath = path.join(uploadDir, fileName);

      // Save file to disk
      await writeFile(filePath, buffer);

      // Set the URL path (accessible from browser)
      coverImageUrl = `/uploads/${fileName}`;
    }

    // Build book object from form data
    const bookData: Record<string, string | string[]> = {};

    try {
      // Extract all form fields except the file
      formData.forEach((value, key) => {
        if (key !== "coverImage") {
          // Convert FormDataEntryValue to string
          const stringValue = typeof value === "string" ? value : value.name;

          // Handle arrays (authors, tags)
          if (key === "authors" || key === "tags") {
            const existingValue = bookData[key];
            if (existingValue) {
              bookData[key] = Array.isArray(existingValue)
                ? [...existingValue, stringValue]
                : [existingValue, stringValue];
            } else {
              bookData[key] = [stringValue];
            }
          } else {
            bookData[key] = stringValue;
          }
        }
      });

      // Add the image URL if uploaded
      if (coverImageUrl) {
        bookData.coverImageUrl = coverImageUrl;
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { message: "Invalid form data format" },
        { status: 400 }
      );
    }

    // Create book in database
    const createdBook = await Book.create(bookData);

    return NextResponse.json(
      {
        message: "Book created successfully",
        book: createdBook,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Book Creation Failed",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 }
    );
  }
}


export async function GET() {
    try {
        await connectDB();
        const books = await Book.find().sort({ createdAt: -1 })
        return NextResponse.json({message: 'Books fetched successfully', books}, {status:200})
    } catch (error) {
        return NextResponse.json({ message: "Books fetching failed", error: error }, { status: 500 })
        
    }
}


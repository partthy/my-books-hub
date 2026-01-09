import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Book } from "@/database";

/**
 * GET /api/books/[slug]
 * Retrieve a single book by its slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { slug: rawSlug } = await params;
    const slug = rawSlug?.trim();

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug parameter is required",
        },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric, hyphens, and underscores only)
    const slugRegex = /^[a-z0-9-_]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid slug format. Only lowercase letters, numbers, hyphens, and underscores are allowed.",
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query book by slug
    const book = await Book.findOne({ slug }).lean();

    // Handle not found
    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: `Book with slug "${slug}" not found`,
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        data: book,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching book by slug:", error);

    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.name === "CastError") {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid slug format",
          },
          { status: 400 }
        );
      }

      if (error.message.includes("buffering timed out")) {
        return NextResponse.json(
          {
            success: false,
            message: "Database connection timeout. Please try again.",
          },
          { status: 503 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch book",
        ...(process.env.NODE_ENV === 'development' && {
          error: error instanceof Error ? error.message : "Unknown error",
        }),
      },
      { status: 500 }
    );
  }
}

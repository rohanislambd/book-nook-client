import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("book-nook");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      author,
      category,
      totalCopies,
      coverImage,
      description,
      userName,
      userEmail,
    } = body;

    if (!title || !author || !category || !totalCopies || !coverImage || !description) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    const newBook = {
      title,
      author,
      category,
      totalCopies: Number(totalCopies),
      availableCopies: Number(totalCopies),
      coverImage,
      description,
      contributor: { name: userName, email: userEmail },
      createdAt: new Date(),
    };

    const result = await db.collection("books").insertOne(newBook);

    return NextResponse.json(
      { message: "Book added successfully!", bookId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add book error:", error);
    return NextResponse.json(
      { error: "Failed to add book. Please try again." },
      { status: 500 }
    );
  }
}


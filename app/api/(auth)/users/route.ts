import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/db";
import User from "@/lib/modals/users";
import { json } from "stream/consumers";

async function GET() {
  try {
    await connectToDatabase(true); // Connect to the database
    const users = await User.find({}); // Fetch all users from the database
    return NextResponse.json(users, { status: 200 }); // Return the users as a JSON response
  } catch (error) {
    return NextResponse.json(
      { messege: "error getting users", error },
      { status: 500 }
    );
  }
}


async function POST(request: Request) {
  try {
    await connectToDatabase(true); // Connect to the database
    const body = await request.json(); // Parse the request body as JSON
    const { name, email, password } = body; // Destructure the user data from the request body

    const newUser = new User({ name, email, password }); // Create a new user instance
    await newUser.save(); // Save the new user to the database

    return NextResponse.json(newUser, { status: 201 }); // Return the newly created user as a JSON response
  } catch (error) {
    return NextResponse.json(
      { messege: "error creating user", error },
      { status: 500 }
    );
  }
}


async function DELETE(request: Request) {
  try {
    await connectToDatabase(true); // Connect to the database
    const body = await request.json(); // Parse the request body as JSON
    const { id } = body; // Destructure the user ID from the request body

    const deletedUser = await User.findByIdAndDelete(id); // Delete the user by ID from the database

    if (!deletedUser) {
      return NextResponse.json({ messege: "user not found" }, { status: 404 }); // Return a 404 error if the user is not found
    }
    return NextResponse.json(
      { message: "successfully deleted user", deletedUser },
      { status: 200 }
    ); // Return the deleted user as a JSON response
  } catch (error) {
    return NextResponse.json(
      { messege: "error deleting user", error },
      { status: 500 }
    );
  }
}


async function PATCH(request: Request) {
  try {
    await connectToDatabase(true); // Connect to the database
    const body = await request.json(); // Parse the request body as JSON
    const { id, ...data } = body; // Destructure the user data from the request body

    const updatedUser = await User.findByIdAndUpdate(
      id,
      data,
      { new: true } // Return the updated user
    ); // Update the user by ID in the database

    if (!updatedUser) {
      return NextResponse.json({ messege: "user not found" }, { status: 404 }); // Return a 404 error if the user is not found
    }
    return NextResponse.json({message:'user updated successfully', updatedUser}, { status: 200 }); // Return the updated user as a JSON response
  } catch (error) {
    return NextResponse.json(
      { messege: "error updating user", error },
      { status: 500 }
    );
  } finally {
    await connectToDatabase(false); // Disconnect from the database
  }
}


// Export the functions to handle the respective HTTP methods
export { GET, POST, DELETE, PATCH }; 
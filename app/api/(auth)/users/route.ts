import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/db";
import User from "@/lib/modals/users";
import {Types} from 'mongoose'


async function GET(request: Request) {
  try {
    await connectToDatabase(true);
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if(!id){
      const users = await User.find({});
      return NextResponse.json(users, { status: 200 });
    }
    if(!Types.ObjectId.isValid(id)){
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 }
      );
    }
    const user = await User.findById(id);
    if(!user){
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
    }
    return NextResponse.json(user, { status: 200 });

   
  } catch (error) {
    return NextResponse.json(
      { messege: "error getting users", error },
      { status: 500 }
    );
  }finally{
    connectToDatabase(false)
  }
}


async function POST(request: Request) {
  try {
    await connectToDatabase(true); 
    const body = await request.json();
    const { name, email, password, image } = body; 

    const newUser = new User({ name, email, password, image }); 
    await newUser.save(); 

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { messege: "error creating user", error },
      { status: 500 }
    );
  }finally{
    connectToDatabase(false)
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
  }finally{connectToDatabase(false)}
}


async function PATCH(request: Request) {
  try {
    await connectToDatabase(true); // Connect to the database
    const body = await request.json(); // Parse the request body as JSON
    const { id, ...data } = body; // Destructure the user data from the request body

    const updatedUser = await User.findByIdAndUpdate(
      id,
      data,
      { new: true }
    ); 

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
    await connectToDatabase(false); 
  }
}

export { GET, POST, DELETE, PATCH }; 
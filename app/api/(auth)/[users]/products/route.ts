import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Products from "@/lib/modals/products";

async function POST(request: Request, context: { params: any }) {
  try {
    await connectToDatabase(true);
    const parameters =await context.params;
    const userID = parameters.users;
    const { name, description, price, imageUrl } = await request.json();

    const newProduct = new Products({
      name,
      description,
      price,
      imageUrl,
      createdBy: userID,
    });
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { messege: "error creating user", error },
      { status: 500 }
    );
  }
}

async function GET(request:Request) {
  try{

  }catch(error){

  }
} 

export { POST, GET };

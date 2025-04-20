import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Products from "@/lib/modals/products";
import { Types } from "mongoose";

async function POST(request: Request) {
  try {
    await connectToDatabase(true);
    const body = await request.json();
    const { name, description, price, imageUrl, createdBy } = body;

    const newProduct = new Products({
      name,
      description,
      price,
      imageUrl,
      createdBy,
    });
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      {
        message: "Error creating product",
        error: error.message || String(error),
      },
      { status: 500 }
    );
  }finally{connectToDatabase(false)}
}

async function GET() {
  try {
    await connectToDatabase(true);
    const users = await Products.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { messege: "error getting users", error },
      { status: 500 }
    );
  }finally{
    connectToDatabase(false)
  }
}

async function PATCH(request: Request) {
  try {
    await connectToDatabase(true);
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");
    
    if (!Types.ObjectId.isValid(productId!)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await request.json()
    const {id, ...data}=body
    
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      data,
      { new: true }
    ); 
    if(!updatedProduct){
     
        return NextResponse.json({ messege: "Product not found" }, { status: 404 }); 
      }
      return NextResponse.json({message:'user updated successfully', updatedProduct}, { status: 200 }); 
  
    
  } catch (error) {
    return NextResponse.json(
      { messege: "error updating products", error },
      { status: 500 }
    );
  }finally{
    connectToDatabase(false)
  }
}

export { POST, GET, PATCH };

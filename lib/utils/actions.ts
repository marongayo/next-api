// app/actions/logout.ts
"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { auth } from "@/auth";
import User from "@/lib/modals/users";
import { Types } from "mongoose";

const url = process.env.REACT_APP_API_URL;

async function logout() {
  await signOut();
  redirect("/");
}


async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) return null;

  await connectToDatabase(true);

  let dbUser = await User.findOne({
    email: session.user.email,
    name: session.user.name,
  });

  if (!dbUser) {
    dbUser = new User({
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      role: "admin",
    });
    await dbUser.save();
  }

  return dbUser;
}

const getThisUser = async function (userid: Types.ObjectId) {
  const res = await fetch(`${url}/api/users?id=${userid}`);
 
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return await res.json();
};

async function patchProduct(productID:String, data:{name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
createdBy: String;
}){

    try{
     const patchBody={...data}
     await connectToDatabase(true)
      const user = await getCurrentUser();
      const endpointPatch= `${url}/api/products?id=${productID}`
     console.log("Pathc Data",data)

      const userID = user?.id;
      const response = await fetch(endpointPatch, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify(patchBody),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Failed to create product");
      }
  
      return result;


    }catch (error: any) {
      console.error("patchproduct error:", error);
      return { success: false, message: error.message };
    }
}

async function postProduct(data: {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}) {
  try {
    const req = `${url}/api/products`;
    const user = await getCurrentUser();
    const userID = user?.id;
    console.log(" user id:  ", userID);
    const response = await fetch(req, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: data.name,
        price: data.price,
        description: data.description,
        createdBy: userID,
        imageUrl: data.imageUrl || "",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create product");
    }

    return result;
  } catch (error: any) {
    console.error("postProduct error:", error);
    return { success: false, message: error.message };
  }
}


export { postProduct, getCurrentUser, logout, getThisUser, patchProduct };

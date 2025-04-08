// app/actions/logout.ts
'use server';

import { signOut } from '@/auth';
import { redirect } from 'next/navigation';


export async function logout() {
  await signOut();
  redirect('/');
}

export async function postProduct(userId: string, data: {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
 
}) {
  try {
   
     


    const response = await fetch(`http://localhost:3000/api/${userId}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        description: data.description,
        imageUrl: data.imageUrl || "",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create product");
    }

    return result; // success response
  } catch (error: any) {
    console.error("postProduct error:", error);
    return { success: false, message: error.message };
  }
}

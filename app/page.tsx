import SignIn from "@/components/sign-in";
import { auth } from "@/auth";
import NavBar from "@/components/navbar";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/modals/users";
import { redirect } from 'next/navigation'




export default async function Home() {
  const session = await auth();
  if (session?.user) {
    await connectToDatabase(true);
    const user = await User.findOne({
      email: session.user.email,
      name: session.user.name,
    });
    // if (!user) {
    //   const newUser = new User({
    //     name: session.user.name,
    //     email: session.user.email,
    //     image: session.user.image,
    //     role: "admin",
    //   });
    //   await newUser.save();
    // }

    if(user){
      console.log(user._id)
      redirect(`${user._id}/dashboard`);
      
     }
  }  
  else{
  return (
    <>
    
        <div>
          <h2>Please Sign In</h2>
          <SignIn />
        </div>
      
    </>
  );
}

 }

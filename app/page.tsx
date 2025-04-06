import Image from "next/image";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import { auth } from "@/auth";
import NavBar from "@/components/navbar";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/modals/users";

export default async function Home() {
const  session = await auth();
console.log("session user", session?.user);
if(session?.user) {
  await connectToDatabase(true)
  const user = await User.findOne({ email: session.user.email, name: session.user.name });
  if (!user) {
    console.log("User not found in the database, creating a new user");
    const newUser = new User({
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      role:"admin"
    });
    await newUser.save();
  }
  //console.log("User found in the database:", user);

}
  return (
<>
  
{session?.user ? (
  <div>
    <NavBar />
    <Image
      src={session.user?.image || "/default-avatar.png"}
      alt={session.user?.name || "User Avatar"}
      width={100}
      height={100}
      
    />
    <h2>User Information</h2>
    <p>Welcome, {session?.user?.name}</p>
    <p>Email: {session?.user?.email}</p>
    <SignOut />
  </div>
) : (
  <div>
    <h2>Please Sign In</h2>
    <SignIn />
  </div>
)}
</>
)};

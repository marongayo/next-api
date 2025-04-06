
import { signOut } from "@/auth"
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
     <button type="submit" className="btn">Sign Out</button>
    </form>
  )
} 
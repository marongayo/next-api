import React from 'react'
import { auth } from "@/auth";
import NavBar from "@/components/navbar";
import TopBar from "@/components/topbar";


const layout = async ({children}: {children:React.ReactNode}) => {
    const session= await auth()
    const user=session?.user
    return (
            <div>
              <TopBar user={user} />
              <div className="flex">
                <NavBar />
                <div className="flex-grow mt-2 mb-2 mr-2 rounded-lg p-4 bg-gray-100 min-h-screen ">
                 {children}
                </div>
              </div>
            </div>
          )
}

export default layout
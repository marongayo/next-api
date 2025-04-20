import React, { useEffect, useState } from 'react'
import { Types } from 'mongoose'
import { getThisUser } from '@/lib/utils/actions'

const UserTable =  ({id}: any) => {
    const [user, setUser]=useState({"name": "Created By", "email":"sample@example.com", "image":"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"})
   useEffect(()=>{
    const fetchUser = async function (id:Types.ObjectId) {
        const data = await getThisUser(id);
        setUser(data) 
    };
    fetchUser(id)
   },[id])

  return (
    <div className="flex items-center gap-3">
    <div className="avatar">
      <div className="mask mask-squircle h-12 w-12">
        
        <img
          src={user.image}
          alt="Avatar Tailwind CSS Component"
        />
      </div>
    </div>
    <div>
      <div className="font-bold">{user.name}</div>
      <div className="text-sm opacity-50">{user.email}</div>
    </div>
  </div>

  )
}

export default UserTable
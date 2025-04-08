'use server'
import React from "react";
import Image from "next/image";
import SignOut from "@/components/sign-out";
import Link from "next/link";
import { redirect } from "next/navigation";

interface DefaultUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined;
}

interface userProps {
  user?: DefaultUser;
}

const TopBar = ({ user }: userProps) => {
  if(!user?.email){
    redirect('/')
  }
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        
        <div className="flex-1 flex-col justify-center">
          <Link className="btn btn-ghost text-xl" href="/">
            Annie's Grocery Store Website
          </Link>
        </div>
        <div className="flex gap-2">
        
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  src={
                    user?.image ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={user?.name || "User Avatar"}
                  width={100}
                  height={100}
                />
               
              </div>
              
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge p-2">{user?.name}</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
              <SignOut />
               
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

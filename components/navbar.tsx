
'use client'

import React from "react";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaBagShopping } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import {usePathname } from "next/navigation";




const NavBar = () => {
  const pathname =usePathname()
  // const pathSegments = pathname.split('/');
  // const userId = pathSegments[1];
  
  const inactiveLink = "flex gap-1  ";
  const activeLink= inactiveLink + 'bg-gray-100 text-gray-500 rounded-l-lg'
  
  
  return (
    <aside className="pr-0 p-4">    
      <nav>
        <Link className={pathname.includes('/dashboard')?activeLink: inactiveLink} href={`/dashboard`}>
          <IoHomeOutline />
          Dashboard
        </Link>
        <Link href={`products`} className={pathname.includes('/products')?activeLink:inactiveLink}>
        <AiFillProduct />
          Products
        </Link>
        <Link href={`orders`} className={pathname.includes('/orders')? activeLink: inactiveLink}>
        <FaBagShopping />
          Orders
        </Link>
        <Link href={`/settings`} className={pathname.includes('/settings')? activeLink: inactiveLink}>
        <IoSettingsOutline />
          Settings
        </Link>
  
      
      </nav>
    </aside>
  );
};

export default NavBar;

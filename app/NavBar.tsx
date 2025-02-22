'use client'
import Link from 'next/link'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import { usePathname } from 'next/navigation'

const NavBar = () => {

    const currentPath = usePathname();
    console.log(currentPath)

    const links = [
        {label:"Dashboard", href:"/"},
        {label:"Issues", href:"/issues"}
    ]

  return (
    <nav className='flex space-x-6 border-b h-14 items-center px-5'>
        <Link href="/">
            < AiFillBug />
        </Link>
        <ul className='flex space-x-6'>
            {links.map( link => 
                
                <Link key={link.href}
                 className={`
                    ${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'}
                    font-medium
                    hover:text-gray-800
                    transitions-colors
                    `
                }
                 href={link.href}
                >
                    {link.label}
                </Link>)}
        </ul>
    </nav>
  )
}

export default NavBar
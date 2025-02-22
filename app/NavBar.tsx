import Link from 'next/link'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'

const NavBar = () => {

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
                 className='font-medium text-zinc-500 hover:text-zinc-800 transition-colors'
                 href={link.href}
                >
                    {link.label}
                </Link>)}
        </ul>
    </nav>
  )
}

export default NavBar
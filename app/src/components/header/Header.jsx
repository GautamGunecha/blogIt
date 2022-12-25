import React from 'react'

// initilizing css variable.
const header = 'w-full flex justify-between p-6 tracking-widest shadow-sm shadow-purple-600 fixed bg-black text-white'
const cursorPointer = 'cursor-pointer'
const unorderedList = 'flex gap-4 text-base'

const Header = () =>
{
    return (
        <div className={`${header}`}>

            <h1 className={`text-lg font-semibold ${cursorPointer}`}>
                Blog IT
            </h1>

            <ul className={`${unorderedList}`}>
                <li className={`${cursorPointer}`}>Featured</li>
                <li className={`${cursorPointer}`}>Categories</li>
                <li className={`${cursorPointer}`}>About Us</li>
                <li className={`${cursorPointer}`}>Contact Us</li>
            </ul>

            <ul className={`${unorderedList}`}>
                <li className={`${cursorPointer}`}>Register</li>
                <li>|</li>
                <li className={`${cursorPointer}`}>Login</li>
            </ul>

        </div >
    )
}

export default Header
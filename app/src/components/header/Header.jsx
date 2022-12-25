import React from 'react'

// initilizing css variable.
const cursorPointer = 'cursor-pointer'
const unorderedList = 'flex gap-4 text-base'

const Header = () =>
{
    return (
        <div className='w-full flex justify-between p-4 tracking-widest bg-slate-300'>
            <h1 className={`text-lg font-semibold ${cursorPointer}`}>
                Blog IT
            </h1>

            <ul className={`${unorderedList}`}>
                <li className={`${cursorPointer}`}>Blogs</li>
                <li className={`${cursorPointer}`}>Single Post</li>
                <li className={`${cursorPointer}`}>Categories</li>
                <li className={`${cursorPointer}`}>About</li>
                <li className={`${cursorPointer}`}>Contact</li>
            </ul>

            <ul className={`${unorderedList}`}>
                <li className={`${cursorPointer}`}>Register</li>
                <li className={`${cursorPointer}`}>Login</li>
            </ul>

        </div >
    )
}

export default Header
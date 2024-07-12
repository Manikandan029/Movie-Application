import React from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="mx-auto max-w-7xl">
            <ol className="flex items-center justify-between py-2 md:py-4 px-4 md:px-8">
                <Link to='/' className="navber-links">
                    <li>Home</li>
                </Link>
                <Link to='/details/new-release/2' className="navber-links">
                    <li>Movies</li>
                </Link>
                <li className="flex">
                    <input className="py-2 pl-4 pr-10 text-lg rounded-full text-black"
                        type="Search" placeholder="Search Movies" />
                    <CiSearch className="mt-3 text-2xl -ml-10 text-black" />
                </li>
                <Link to='/details/new-release-series/2' className="navber-links">
                    <li>Series</li>
                </Link>
                <Link to='/login' className="navber-links">
                    <li>Login</li>
                </Link>
            </ol>
        </div>
    );
}

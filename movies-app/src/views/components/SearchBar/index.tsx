import React, { useEffect, useState } from 'react'
import './css/style.scss'
import { Link } from 'react-router-dom';

function SearchBar() {
    const [searchInput, setSearchInput] = useState<string>('');
    // const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);

    function handleInput(value: string) {
        setSearchInput(value);
    }

    function handleClick() {
        setSearchInput('');
    }

    return (

        <form className="max-w-lg w-1/5">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="#1d63ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input value={searchInput} onChange={(e) => handleInput(e.target.value)} type="search" id="default-search" className="search_input h-8 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search titles" required />

                {searchInput && <Link to={`/searchResults/${searchInput}`}>
                    <button onClick={handleClick} className="search_button text-white absolute end-1 bottom-1.5 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    </button>
                </Link>}

            </div>
        </form>

    )
}

export default SearchBar
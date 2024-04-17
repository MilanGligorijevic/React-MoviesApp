import React, { useEffect, useState } from 'react'
import './css/style.scss'
import { useParams } from 'react-router';
import axios from 'axios';
import SearchResult from '../../../types/searchResult';
import SearchResultPreview from '../../components/SearchResultPreview';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

function SearchResults() {
    const { searchQuery } = useParams();
    const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/multi',
            params: { query: searchQuery, include_adult: 'false', language: 'en-US', page: '1' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTA2YWFmOWNkMjE1ZWMwMjZjYTY5OTBlMjE2NDQ4ZiIsInN1YiI6IjY2MDQ0NGQyMDQ3MzNmMDE0YWU4NWYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BWiPQiJfB-kVLufmhb-dwWewyLYfisJfxBAzmxV89GA'
            }
        };

        async function fetchData() {
            const { data } = await axios.request(
                options
            );
            console.log("HERE ", data)
            const searchResults: SearchResult[] = [];
            // fiksno vraca prvih 15 rezultata zbog prevelike kolicine podataka
            data.results.slice(0, 15).map((result: any) => {
                const newResult: SearchResult = {
                    id: result.id,
                    title: result.title || result.name,
                    overview: result.overview,
                    genres: result.genre_ids,
                    releaseDate: result.release_date || result.first_air_date,
                    posterPath: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
                    // backgroundPath: `https://image.tmdb.org/t/p/original/${result.backdrop_path}`
                    mediaType: result.media_type,
                }
                searchResults.push(newResult);
            })
            setSearchResult(searchResults);
        }
        fetchData();
    }, [searchQuery])
    return (
        <div className='search_results_main'>
            <Navbar />
            <div className='ml-20 mt-10 mb-10 flex-col'>
                <div>
                    <div className='search_results-title'>Results for <strong>"{searchQuery}"</strong></div>
                </div>
                <div className='flex flex-wrap gap-3 mt-5'>
                    {searchResult.map((result) => {
                        return <SearchResultPreview {...result} />
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SearchResults
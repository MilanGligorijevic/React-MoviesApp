import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Show from "../types/show";
import Movie from "../types/movie";
import { getUsersWatchlist } from "../firebase/config";
import { useCurrentUser } from "./usersContext";



const WatchlistContext = createContext<Array<Movie | Show> | undefined>(undefined);

interface WatchlistContextProviderProps {
    children: ReactNode;
}

export function WatchlistContextProvider({ children }: WatchlistContextProviderProps) {
    const [watchlist, setWatchlist] = useState<Array<Movie | Show>>([]);
    const currentUser = useCurrentUser();
    console.log(currentUser.user);
    useEffect(() => {
        async function fetchWatchlistItems() {
            if (currentUser.user !== null) {
                const watchlistItems: [] = await getUsersWatchlist(currentUser.user.userId);
                setWatchlist(watchlistItems);
            } else {
                console.log("OVDE")
            }
        }
        fetchWatchlistItems();
    }, [currentUser.user])

    return (
        <WatchlistContext.Provider value={watchlist}> {children} </WatchlistContext.Provider>
    )
}

export function useWatchlist() {
    const watchlistItems = useContext(WatchlistContext);
    console.log(watchlistItems);
    if (watchlistItems === undefined) {
        throw new Error("Watchlist must be used within a WatchlistProvider");
    }
    return watchlistItems;
}
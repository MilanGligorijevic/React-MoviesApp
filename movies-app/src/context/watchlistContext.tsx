import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Show from "../types/show";
import Movie from "../types/movie";
import { addToWatchlist, getUsersWatchlist, removeFromWatchlist } from "../firebase/config";
import { useCurrentUser } from "./usersContext";

interface WatchlistContextValue {
  watchlist: (Movie | Show | undefined)[];
  addToWatchlistAndFirebase: (item: Movie | Show) => Promise<void>;
  removeFromWatchlistAndFirebase: (item: Movie | Show) => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);

interface WatchlistContextProviderProps {
  children: ReactNode;
}

export function WatchlistContextProvider({ children }: WatchlistContextProviderProps) {
  const [watchlist, setWatchlist] = useState<Array<Movie | Show | undefined>>([]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    async function fetchWatchlistItems() {
      if (currentUser.user !== null) {
        const watchlistData = await getUsersWatchlist(currentUser.user.userId);
        setWatchlist(watchlistData);
      } else {
        console.log("OVDE")
      }
    }
    fetchWatchlistItems();
  }, [currentUser.user])

  const addToWatchlistAndFirebase = async (item: Movie | Show) => {
    if (currentUser.user !== null) {
      if (watchlist?.some((i) => i?.id === item.id)) return;
      // film postoji i prekidamo dodavanje, obavestiti korisnika da film postoji u watchlistu
      await addToWatchlist(currentUser.user.userId, item);

      setWatchlist(prevWatchlist => {
        if (prevWatchlist !== undefined) return [...prevWatchlist, item];
        return [item];
      });
    } else {
      console.log("User not logged in");
    }
  };

  const removeFromWatchlistAndFirebase = async (item: Movie | Show | undefined) => {
    if (currentUser.user !== null) {
      await removeFromWatchlist(currentUser.user.userId, item);
      setWatchlist(prevWatchlist => prevWatchlist.filter(removeItem => removeItem?.id !== item?.id));
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlistAndFirebase, removeFromWatchlistAndFirebase }}> {children} </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const watchlistItems = useContext(WatchlistContext);
  if (watchlistItems === undefined) {
    throw new Error("Watchlist must be used within a WatchlistProvider");
  }
  return watchlistItems;
}
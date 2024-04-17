import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import Show from "../types/show";
import Movie from "../types/movie";
import { addToWatchlist, getUsersWatchlist, removeFromWatchlist } from "../firebase/config";
import { useCurrentUser } from "./usersContext";

interface WatchlistContextValue {
  watchlist: (Movie | Show | undefined)[];
  addToWatchlistAndFirebase: (item: Movie | Show) => Promise<void>;
  removeFromWatchlistAndFirebase: (itemId: number) => Promise<void>;
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
      if (watchlist.length === 0) {
        const oneItem = [item];
        setWatchlist(oneItem);
        return;
      }
      setWatchlist(prevWatchlist => [...prevWatchlist, item]);
    } else {
      console.log("User not logged in");
    }
  };

  const removeFromWatchlistAndFirebase = async (itemId: number) => {
    if (currentUser.user !== null) {
      await removeFromWatchlist(currentUser.user.userId, itemId);
      setWatchlist(prevWatchlist => prevWatchlist.filter(item => item?.id !== itemId));
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
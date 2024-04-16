import { onAuthStateChanged } from "firebase/auth";
import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

interface Reducer {
  user: any,
  userDispatch: Dispatch<ReducerAction>
}

const UsersContext = createContext<Reducer | undefined>(undefined);

interface UsersContextProviderProps {
  children: ReactNode;
}

interface ReducerAction {
  type: string,
  payload: any,
}

const initialState = {
  currentUser: null,
}

export function UsersContextProvider({ children }: UsersContextProviderProps) {

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const currUser = { userId: user.uid, userEmail: user.email };
            dispatch({ type: 'SET_USER', payload: currUser }) //ukoliko promenimo tab ili zatvorimo browser, user ce i dalje ostati ulogovan
        } else {
            dispatch({type: 'SET_USER', payload: null});
        }
    });
}, [])

  const reducer = (state: any, action: ReducerAction) => {
    switch (action.type) {
      // ova akcija sluzi i za logovanje i izlogovanje korisnika
      case 'SET_USER':
        console.log("SETTING USER")
        initialState.currentUser = action.payload;
        console.log(initialState.currentUser);
        return initialState.currentUser;
      default:
        throw new Error();
    }
  }

  const [currentUser, dispatch] = useReducer(reducer, initialState.currentUser);
  return (

    <UsersContext.Provider value={{ user: currentUser, userDispatch: dispatch }}> {children} </UsersContext.Provider>
  )
}

export function useCurrentUser() {
  const user = useContext(UsersContext);
  console.log(user)
  if (user === undefined) {
    throw new Error("User must be used within a UsersProvider");
  }
  return user;
}


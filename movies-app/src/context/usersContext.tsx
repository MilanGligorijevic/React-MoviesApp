import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
// import { useReducer } from "react";

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

//DODAJ REDUCER SA DISPATCH OPCIJAMA
export function UsersContextProvider({ children }: UsersContextProviderProps) {

  const reducer = (state: any, action: ReducerAction) => {
    switch (action.type) {
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


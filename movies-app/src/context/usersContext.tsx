import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import User from "../types/user";
// import { useReducer } from "react";

const UsersContext = createContext<User | undefined>(undefined);

interface UsersContextProviderProps {
  children: ReactNode;
}

const enum REDUCER_ACTION_TYPE {
  SET_USER,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE,
  payload: User,
}

const initialSate = {
  currentUser: { id: 0, email: 'lol', password: 'lol' },
}
//DODAJ REDUCER SA DISPATCH OPCIJAMA
export function UsersContextProvider({ children }: UsersContextProviderProps) {

  function userReducer(state = initialSate, action: ReducerAction) {
    switch (action.type) {
      case REDUCER_ACTION_TYPE.SET_USER:
        initialSate.currentUser = action.payload;
        break;
      default:
        throw new Error();
    }
  }

  return (

    <UsersContext.Provider value={initialSate.currentUser}> {children} </UsersContext.Provider>
  )
}

// export function useCurrentUser() {
//   const currentUser = useContext(UsersContext);
//   console.log(currentUser)
//   if (currentUser === undefined) {
//     throw new Error("User must be used within a UsersProvider");
//   }
//   return currentUser;
// }


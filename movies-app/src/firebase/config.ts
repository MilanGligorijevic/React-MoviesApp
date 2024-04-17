import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  getFirestore,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import Show from "../types/show";
import Movie from "../types/movie";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkFO3ygRyzgmYv2o-qDe5UKhbKTUvQgvs",
  authDomain: "movies-app-4b606.firebaseapp.com",
  projectId: "movies-app-4b606",
  storageBucket: "movies-app-4b606.appspot.com",
  messagingSenderId: "507463976848",
  appId: "1:507463976848:web:bb4edf7b415951be3e5515",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

const db = getFirestore(app);

const colRef = collection(db, "watchlists");

getDocs(colRef)
  .then((snapshot) => {
    const watchlist: any[] = [];
    snapshot.docs.forEach((doc) => {
      watchlist.push({ ...doc.data(), id: doc.id });
    });
  })
  .catch((error) => {
    console.log(error);
  });

//funkcija za dodavanje novog filma/serije u watchlist
async function addToWatchlist(
  userId: string,
  itemToAdd: Movie | Show | undefined
) {
  const watchlistRef = doc(db, "watchlists", userId);
  await updateDoc(watchlistRef, {
    watchlist: arrayUnion(itemToAdd),
  });
}

//funkcija za brisanje filma/serije iz watchlist
async function removeFromWatchlist(
  userId: string,
  itemToRemove: Movie | Show | undefined
) {
  const watchlistRef = doc(db, "watchlists", userId);
  await updateDoc(watchlistRef, {
    watchlist: arrayRemove(itemToRemove),
  });
}

//funkcija za preuzimanje watchlista korisnika
async function getUsersWatchlist(userId: string) {
  const docRef = doc(db, "watchlists", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return await docSnap.data().watchlist;
  } else {
    await setDoc(docRef, {
      watchlist: [],
    });
    console.log("No such document!");
    return;
  }
}

export { addToWatchlist, getUsersWatchlist, removeFromWatchlist };

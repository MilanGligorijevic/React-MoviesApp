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
let usersWatchlist: (Movie | Show | undefined)[] = [];

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
  // await setDoc(
  //   doc(db, "watchlists", userId),
  //   {
  //     userId,
  //     watchlist: [...usersWatchlist, itemToAdd],
  //   },
  //   { merge: true }
  // );
  const watchlistRef = doc(db, "watchlists", userId);
  await updateDoc(watchlistRef, {
    watchlist: arrayUnion(itemToAdd),
  });
}

async function removeFromWatchlist(userId: string, itemToRemove: number) {
  // await setDoc(
  //   doc(db, "watchlists", userId),
  //   {
  //     userId,
  //     watchlist: usersWatchlist.filter(
  //       (item: Movie | Show | undefined) => item?.id !== itemToRemove
  //     ),
  //   },
  //   { merge: true }
  // );
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
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return usersWatchlist;
  }
}

export { addToWatchlist, getUsersWatchlist, removeFromWatchlist };

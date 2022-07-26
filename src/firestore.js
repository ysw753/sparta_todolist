// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const API_KEY = process.env.REACT_APP_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: "spartareact-2907c.appspot.com",
  messagingSenderId: "1054729357614",
  appId: "1:1054729357614:web:b6769b42a13358b0a992bf",
  measurementId: "G-PP2YPS2SD9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getTodos(db) {
  const todosCol = collection(db, "todo_list");
  const todoSnapshot = await getDocs(todosCol);
  const todoList = todoSnapshot.docs.map((doc) => doc.data());
  return todoList;
}

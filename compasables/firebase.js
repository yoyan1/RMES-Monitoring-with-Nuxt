import { initializeApp } from 'firebase/app'
import { getFirestore, collection, } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  
  apiKey: "AIzaSyANm3upeIbvRZ2sEOfUQjt9iSTGgR2jnHg",
  authDomain: "rmes-monitoring-system.firebaseapp.com",
  projectId: "rmes-monitoring-system",
  storageBucket: "rmes-monitoring-system.appspot.com",
  messagingSenderId: "610369031733",
  appId: "1:610369031733:web:57a4a5ece2c9fa3c982b7c",
  measurementId: "G-BRZNQNTLP1"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
export {db}
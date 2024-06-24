import { initializeApp } from 'firebase/app'
import { getFirestore, collection, } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  
  
})

// used for the firestore refs
const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
export {db}
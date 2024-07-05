import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  
  
})

// used for the firestore refs
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp)
export {db, auth}

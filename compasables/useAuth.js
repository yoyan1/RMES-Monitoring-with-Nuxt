// composables/useAuth.js
import { ref } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const auth = useFirebaseAuth();
const user = ref(null);
const isAuthenticated = ref(false);

export function useAuth() {
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      isAuthenticated.value = true;
    } catch (error) {
      console.error('Login failed:', error);
      isAuthenticated.value = false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      isAuthenticated.value = false;
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const checkAuthStatus = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
        isAuthenticated.value = true;
      } else {
        user.value = null;
        isAuthenticated.value = false;
      }
    });
  };

  return { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    checkAuthStatus };
}

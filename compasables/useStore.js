// composables/useFirestore.js
import { ref, onUnmounted } from 'vue';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const db = useFirestore()

export default function useStore(collectionName) {
  const documents = ref([]);
  const error = ref(null);
  const isLoading = ref(false);

  // Create document
  const createDocument = async (data) => {
    isLoading.value = true;
    error.value = null;
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      isLoading.value = false;
      return docRef;
    } catch (err) {
      error.value = err.message;
      isLoading.value = false;
    }
  };

  // Read documents
  const collectionRef =  collection(db, collectionName);

  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    documents.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    isLoading.value = false;
  }, (err) => {
    error.value = err.message;
    isLoading.value = false;
  });

  onUnmounted(() => {
    unsubscribe();
  });

  // Update document
  const updateDocument = async (id, data) => {
    isLoading.value = true;
    error.value = null;
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
      isLoading.value = false;
    } catch (err) {
      error.value = err.message;
      isLoading.value = false;
    }
  };

  // Delete document
  const deleteDocument = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      isLoading.value = false;
    } catch (err) {
      error.value = err.message;
      isLoading.value = false;
    }
  };

  return {
    documents,
    error,
    isLoading,
    createDocument,
    updateDocument,
    deleteDocument
  };
}

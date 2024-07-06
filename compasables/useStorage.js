// composables/useFirebaseStorage.js
import { ref } from 'vue';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { storage } from './firebase';
// const storage = useFirebaseStorage()

export default function useStorage() {
  const uploadError = ref(null);
  const uploadProgress = ref(0);
  const downloadURL = ref(null);

  const uploadFile = async (file, path) => {
    uploadError.value = null;
    uploadProgress.value = 0;
    downloadURL.value = null;

    try {
      const fullPath = `${path}/${file.name}`;
      const fileRef = storageRef(storage, fullPath);
      const snapshot = await uploadBytes(fileRef, file);

      // Monitor the upload progress (optional)
      uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      // Get the download URL
      downloadURL.value = await getDownloadURL(fileRef);
    } catch (err) {
      uploadError.value = err.message;
    }
  };

  return {
    uploadError,
    uploadProgress,
    downloadURL,
    uploadFile
  };
}

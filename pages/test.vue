<script setup>
// See https://vueuse.org/core/useFileDialog
import { useFileDialog } from '@vueuse/core'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'

const { files, open, reset } = useFileDialog()
const image = files?.length === 1? files.item(0).name : ''
const storage = useFirebaseStorage()
const mountainFileRef = storageRef(storage, 'images/' + image)

const {
  url,
  // gives you a percentage between 0 and 1 of the upload progress
  uploadProgress,
  uploadError,
  // firebase upload task
  uploadTask,
  upload,
} = useStorageFile(mountainFileRef)

function uploadPicture() {
  const data = files.value?.item(0)
  if (data) {
    upload(data)
  }
}

// const filename = ref<string>()
</script>

<template>
  <form @submit.prevent="uploadPicture">
    <!-- disable the form while uploading -->
    <fieldset :disabled="!!uploadTask">
      <button
        type="button"
        @click="open({ accept: 'image/*', multiple: false })"
      >
        <template v-if="files?.length === 1">
          Selected file: {{ files.item(0).name }} (Click to select another)
        </template>
        <template v-else> Select one picture </template>
      </button>
      <br />

      <button>Upload</button>
    </fieldset>
    <img :src="url" alt="">
  </form>
</template>
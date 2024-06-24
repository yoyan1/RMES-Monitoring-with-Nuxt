<script setup>
import {collection, getDocs, addDoc} from 'firebase/firestore';
import { db } from '~/compasables/firebase';

definePageMeta({
  layout: 'admin'
})


const archiveStudents = ref([])
const students = ref([])
const loading = ref(false)

onBeforeMount(async () => {
  loading.value = true
  try{
    const querySnapshot = await getDocs(collection(db, "archives"));
    querySnapshot.forEach(docData => {
      archiveStudents.value.push({id:docData.id, ...docData.data()})
    });
    loading.value = false
  } catch(err){
    loading.value = false
    console.error("Error fetching students data:", err);
  }
})
</script>
<template>
    <div class="border-2 bg-white border-gray-200 rounded">
      <h1 class="text-2xl p-5 bg-blue-500 text-white font-semibold">Archive Students</h1>
        <div class="p-5 m-4 rounded border h-full">
          <div class="flex gap-5">
            <div v-for="archive in archiveStudents" :key="archive.id">
              <NuxtLink :to="`/admin/archives/${archive.id}`" class=" bg-gray-50 flex flex-col items-center shadow-lg p-2 rounded hover:bg-gray-200 hover:text-blue-700">
                <Icon name="heroicons:archive-box-20-solid" class="text-blue-400 text-8xl"/>
                <span>{{ archive.school_year }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
    </div>
</template>
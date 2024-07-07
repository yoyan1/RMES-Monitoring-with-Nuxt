<script setup>
import {collection, doc, getDocs, addDoc, updateDoc, query, where} from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';
import AddOrUpdate from '~/components/form/AddOrUpdate.vue';
import PreviewStudent from '~/components/studentComponents/PreviewStudent.vue';
import ImportStudents from '~/components/form/ImportStudents.vue';

definePageMeta({
  layout: 'admin'
})

const db = useFirestore()
const toast = useToast()
const students = useCollection(collection(db, 'students'))
const loading = ref(false)


const isOpen = ref(false)
const columns = [
                {key: 'fullname', label: 'Name', sortable: true}, 
                {key: 'lrn',  label: 'LRN'}, 
                {key: 'date_of_birth',  label: 'Age', sortable: true}, 
                {key: 'level',  label: 'Level', sortable: true}, 
                {key: 'status',  label: 'Status', sortable: true}, 
                {key: 'actions'}
              ]


const items = () => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    // click: () => console.log('Edit', row.id)
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

const q = ref('')
const level = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return students.value
  }

  return students.value.filter((student) => {
    return Object.values(student).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  return filteredRows.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

function calculateAge(birthDate) {
    var today = new Date();
    var birthDate = new Date(birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const selected = ref()
const levels = ['I', 'II', 'III', 'IV', 'V', 'VI']

const year = ref()
const archiveData = ref({})
const load = ref(false)
const archive = async() => {
  load.value = true
  const queryRecord = query(
        collection(db, 'archives'),
        where('school_year', '==', year.value),
      );
      
      const archivesSnapchat = await getDocs(queryRecord);
      if(archivesSnapchat.empty){
        try {
        archiveData.value = {...{school_year: year.value}, ...{list: students.value}}  
        const docRef = await addDoc(collection(db, "archives"), archiveData.value);
        console.log("Document written with ID: ", docRef.id);
        
        toast.add({title: 'Successfuly added to archives'})
        load.value = false
        isOpen.value = false
      } catch (e) {
        console.error("Error adding document: ", e);
        toast.add({title: 'Added to archives error'})
      }
    } else{
      // for (const record of archivesSnapchat.docs) {
      //       try {
      //         const docRef = doc(db, 'archives', record.id);
      //         archiveData.value = {...record.data(), list: {...record.list, ...students.value}}
      //         await updateDoc(docRef, archiveData.value);
              load.value = false
              isOpen.value = false
              toast.add({title: 'Successfuly added to archives '+year.value})
      
      //       } catch (err) {
      //         load.value = false
      //         isOpen.value = false
      //         toast.add({title: 'Added to archives '+year.value+' failed'})
      //         console.error(err);
      //       }
      // }

    }
}

const isOpenPreview = ref(false)
const rowOpen = ref()
function select (row) {
  isOpenPreview.value = true
  // const index = selected.value.findIndex((item) => item.id === row.id)
  // if (index === -1) {
    rowOpen.value = row
  // } else {
    
  // }
}

</script>
<template>
    <div class="px-4">
      <UModal v-model="isOpen" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                Archive students
              </h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
            </div>
          </template>
          <UInput v-model="year" :ui="{ color:{white: {outline: 'focus:ring-blue-600' }}  }" placeholder="Enter school year (2024-2025)"/> <br>
          <UButton label="Archive" color="blue" :loading="load" @click="archive" required/>
        </UCard>
      </UModal>
      <PreviewStudent :isOpen="isOpenPreview" :row="rowOpen" @close="isOpenPreview = false"/>
        <div class="mb-4 rounded">
            <!-- <div class="p-5 bg-blue-600 text-white"> -->
                <h1 class="text-xl">STUDENTS</h1>
            <!-- </div> -->
            <div class="flex items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between h-20 max-h-20 px-5 mb-5 bg-white shadow rounded-md">
                    <div class="w-full md:w-1/2">
                        <UInput v-model="q" placeholder="Search name or lrn" :ui="{ color:{white: {outline: 'focus:ring-blue-600' }}  }" />
                    </div>
                    <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <AddOrUpdate/>
                        <ImportStudents/>
                         <USelectMenu v-model="selected" :options="levels" :ui="{ color:{white: {outline: 'focus:ring-blue-600' }}  }" placeholder="Select " />
                        <div class="flex items-center space-x-3 w-full md:w-auto"> 
                            <UButton label="Archive all" icon="i-heroicons-archive-box-arrow-down-20-solid" color="blue" @click="isOpen = true"/>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-5 shadow rounded-md">
                  <UTable :loading="loading" :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }" :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }" v-model="selected" @select="select" :rows="rows" :columns="columns" cl>
                      <template #fullname-data="{row}">
                        <div class="flex items-center gap-3">
                          <UAvatar  size="sm"  :src="row.imageUrl "  alt="Avatar"/>
                          <span class="font-semibold">{{ row.fullname }}</span>
                        </div>
                      </template>
                      <template #date_of_birth-data="{row}">
                        <div class="flex items-center gap-3">
                          <span class="font-semibold">{{ calculateAge(row.date_of_birth) }}</span>
                        </div>
                      </template>
                      <template #status-data="{row}">
                        <div class="flex items-center gap-3">
                          <span :class="row.status=='Present'? 'text-green-600 border-green-600 bg-green-100' : 'text-red-600 border-red-600 bg-red-100'" class="border px-1 rounded">{{ row.status }}</span>
                        </div>
                      </template>
                      <template #actions-data="{ row }">
                          <UDropdown :items="items(row)">
                              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                          </UDropdown>
                      </template>
                  </UTable>
                  <div class="flex justify-end">
                    <UPagination v-model="page"  :active-button="{ variant: 'outline' }"  :inactive-button="{ color: 'gray' }" :page-count="pageCount"  :total="students.length" :ui="{default: {activeButton: {  color: 'blue',}}}"/>
                  </div>
                </div>
        </div>
    </div>
</template>
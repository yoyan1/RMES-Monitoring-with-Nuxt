<script setup>
import { doc, getDoc } from "firebase/firestore";
import { db } from '~/compasables/firebase';

definePageMeta({
  layout: 'admin'
})

const loading = ref(false)
const { id } = useRoute().params
const archive = ref()
const students = ref([])

onMounted(async () => {
  loading.value = true
  const docRef = doc(db, "archives", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    archive.value = docSnap.data()
    const list = archive.value.list
    list.forEach(student => {
      students.value.push(student)
    })
    loading.value = false
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
})


const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/admin/archive'
}, {
  label: 'Archives',
  icon: 'i-heroicons-archive-box-20-solid'
},]


const columns = [{
  key: 'fullname',
  label: 'Name'
}, {
  key: 'lrn',
  label: 'LRN'
}, {
  key: 'barangay',
  label: 'Barangay'
}, {
  key: 'street',
  label: 'Street'
}, {
  key: 'actions'
}]

const people = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner'
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}]

const items = (row) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
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

const selected = ref([])
</script>
<template>
  <UBreadcrumb :links="links" :ui="{active: 'text-blue-500 dark:text-blue-400'}"/>
    <div class="p-4 border-2 bg-white border-gray-200 rounded">
      <div class="p-5 bg-blue-500 text-white">
        <h1 class="text-2xl font-semibold">Archive Students</h1>
        <span>(S.Y. ({{ archive? archive.school_year : 'loading..' }}))</span>
      </div>
        <div class="mb-4 rounded">
          <div class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between border-t dark:border-gray-700 h-20 max-h-20 px-5">
              <div class="w-full md:w-1/2">
                  <UInput v-model="q" placeholder="Search..." :ui="{ color:{white: {outline: 'focus:ring-blue-600' }}  }" />
              </div>
              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <div class="flex items-center space-x-3 w-full md:w-auto"> 
                      <UButton label="Unarchive" icon="i-heroicons-archive-box-arrow-down-20-solid" color="blue"/>
                  </div>
              </div>
          </div>
            <UTable v-model="selected" :rows="rows" :columns="columns" :loading="loading">
              <template #empty-state>
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                  <Icon name="heroicons:circle-stack-20-solid" class="text-xl text-gray-400"/>
                  <span class="text-sm">No items!</span>
                </div>
              </template>
                <template #name-data="{ row }">
                    <span :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
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
</template>
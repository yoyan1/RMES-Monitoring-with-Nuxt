<script setup lang="ts">
const columns = [{
  key: 'name',
  label: 'Name'
}, {
  key: 'title',
  label: 'Title'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'role',
  label: 'Role'
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
    return people
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const selected = ref()
const levels = ['I', 'II', 'III', 'IV', 'V', 'VI']
</script>
<template>
    <div class="p-4 border-2 bg-white border-gray-200 rounded">
        <div class="mb-4 rounded">
            <div class="p-5 bg-blue-600 text-white">
                <h1 class="text-xl">STUDENTS</h1>
            </div>
            <div class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between border-t dark:border-gray-700 h-20 max-h-20 px-5">
                    <div class="w-full md:w-1/2">
                        <UInput v-model="q" placeholder="Search name or lrn" />
                    </div>
                    <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        
                         <USelectMenu v-model="selected" :options="levels" class="border-blue-600" placeholder="Select " />
                        <div class="flex items-center space-x-3 w-full md:w-auto">
                            <button  class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-red-600 focus:outline-none bg-white rounded-lg border border-red-600 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-red-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white hover:bg-red-200" type="button">
                                Delete all
                            </button>
                        </div>
                    </div>
                </div>
            <UTable loading :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }" :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }" v-model="selected" :rows="filteredRows" :columns="columns">
    
                <template #actions-data="{ row }">
                    <UDropdown :items="items(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>
            </UTable>
        </div>
    </div>
</template>
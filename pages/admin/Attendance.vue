<script setup>
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {collection, getDocs} from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire'


definePageMeta({
  layout: 'admin'
})

const db = useFirestore()
const toast = useToast()
const records = useCollection(collection(db, 'students_record'))
const loading = ref(false)

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  return records.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const columns = [
  {key: 'name', label: 'Name', sortable: true},
  {key: 'status', label: 'Status'},
  {key: 'time_in', label: 'Time in'},
  {key: 'time_out', label: 'Time out'},
  {key: 'date', label: 'Date', sortable: true},
]

const loadExport = ref(false)
const downloadPDF = () => {
      loadExport.value = true
      const doc = new jsPDF();
      autoTable(doc, {
        head: [['ID', 'Name', 'Status', 'Time in', 'Time out', 'Date']],
        body: records.value.map(record => [
          record.id,
          record.name,
          record.status,
          record.time_in,
          record.time_out,
          record.date,
        ])
      });
      doc.save('logs.pdf');
      toast.add({ icon:"i-heroicons-check-circle", description:"Export success.", timeout:3000,title:"Success" })
      loadExport.value = false
    };
</script>

<template>
    <div class="px-4">
        <div class="mb-4 rounded-md">
          <div class="flex justify-between px-3 py-3.5 bg-white shadow ronded mb-5">
            <h1 class="text-xl">Students Attendance</h1>
            <UButton icon="i-heroicons-arrow-up-on-square-16-solid" color="blue" @click="downloadPDF" :loading="loadExport"> Export</UButton>
          </div>
          <div class="bg-white p-3 shadow  flex flex-col rounded-md">
            <UTable :loading="loading" :rows="rows" :columns="columns">
            </UTable>
            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
              <UPagination v-model="page"  :active-button="{ variant: 'outline' }"  :inactive-button="{ color: 'gray' }" :page-count="pageCount"  :total="records.length" :ui="{default: {activeButton: {  color: 'blue',}}}"/>
            </div>
          </div>
        </div>
    </div>
</template>
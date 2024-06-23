<script setup>
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {collection, getDocs} from 'firebase/firestore';
import { db } from '~/compasables/firebase';

definePageMeta({
  layout: 'admin'
})

const toast = useToast()
const records = ref([])
const loading = ref(false)

onBeforeMount(async () => {
  loading.value = true
  try{
    const querySnapshot = await getDocs(collection(db, "students_record"));
    const index = ref(0)
    querySnapshot.forEach(record => {
      index.value += 1
      records.value.push({id:index.value, ...record.data()})
    });
    loading.value = false
  } catch(err){
    loading.value = false
    console.error("Error fetching students data:", err);
  }
})


const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  return records.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const columns = [
  {key: 'id', label: 'ID', sortable: true},
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
    <div class="p-4 border-2 bg-white border-gray-200 rounded">
        <div class="mb-4 rounded">
            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UButton icon="i-heroicons-arrow-up-on-square-16-solid" color="blue" @click="downloadPDF" :loading="loadExport"> Export</UButton>
            </div>
            <UTable :loading="loading" :rows="rows" :columns="columns">
                <template #caption>
                  <caption class="p-3 bg-blue-600 text-white">STUDENT LOGS</caption>
                </template>
            </UTable>
            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
              <UPagination v-model="page"  :active-button="{ variant: 'outline' }"  :inactive-button="{ color: 'gray' }" :page-count="pageCount"  :total="records.length" :ui="{default: {activeButton: {  color: 'blue',}}}"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import Papa from 'papaparse';
import { writeBatch, doc, collection } from "firebase/firestore";
import { useFirestore} from 'vuefire';

const db = useFirestore()
const isOpen = ref(false)
const files = ref();
const file = ref(null);
const dialogLoading = ref(false);

const handleFileChange = (event) => {
    file.value = event.target.files[0];
    Papa.parse(file.value, {
        header: true,
        complete: (results) => {
            let removeEmpty = [];
            // Lowercase the headers
            const lowerCaseHeaders = results.meta.fields.map(field => field.toLowerCase());
            // Transform the data to use lowercase headers
            const transformedData = results.data.map(row => {
                let newRow = {};
                lowerCaseHeaders.forEach((header, index) => {
                    newRow[header] = row[results.meta.fields[index]];
                });
                return newRow;
            });
            // Filter out rows with no values
            transformedData.forEach(row => {
                const hasValues = Object.values(row).some(value => value != null && value != '');
                console.log(row)
                if (hasValues) {
                    removeEmpty.push({ ...row });
                }
            });
            files.value = removeEmpty;
        },
        error: (error) => {
            console.error('Error parsing CSV file:', error);
        }
    });
};
const uploadFile = async () => {
    dialogLoading.value = true;
    const batch = writeBatch(db);
    const studentsCollection = collection(db, "students");
    files.value.forEach(fileData => {
        const newDocRef = doc(studentsCollection); // Automatically generates a unique ID

        // Map CSV fields to Firestore 
            const studentData = {
                fullname: fileData.fullname,
                gender: fileData.gender || 'N/A',
                date_of_birth: fileData.dateofbirth,
                province: fileData.province,
                municipality: fileData.municipality,
                barangay: fileData.barangay,
                street: fileData.street,
                zone: fileData.zone,
                parent: fileData.parents,
                contact_number: fileData.phone,
                level: fileData.gradelevel,
                section: fileData.section,
                lrn: fileData.lrn,
                imageUrl: '',
                // adviser_id: props.staffId,
                status: 'new',
            };
        batch.set(newDocRef, studentData);
    });
    // Commit the batch
    await batch.commit();
    // isOpen.value = false;
    dialogLoading.value = false;
};

</script>

<template>
  <div>
    <UButton  icon="i-heroicons-arrow-down-on-square-16-solid" color="blue" @click="isOpen = true" />

    <UModal v-model="isOpen" prevent-close fullscreen>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Modal
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>
        <input type="file" @change="handleFileChange" />
        <UButton label="submit" @click="uploadFile" :loading="dialogLoading"/>
        <UTable :rows="files" />
      </UCard>
    </UModal>
  </div>
</template>


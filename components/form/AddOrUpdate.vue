<script setup>
import useStorage from '~/compasables/useStorage';
import useStore from '~/compasables/useStore';

const isOpen = ref(false)
const isLoading = ref(false)
const {createDocument, updateDocument, error} = useStore('students')
const { uploadError, uploadProgress, downloadURL, uploadFile } = useStorage()


const studentData = ref({
    fullname: '',
    gender: '',
    date_of_birth: '',
    province: '',
    municipality: '',
    barangay: '',
    street: '',
    zone: '',
    parent: '',
    contact_number: 0,
    token: '',
    level: '',
    section: '',
    lrn: 0,
    imageUrl: '',
    // adviser_id: props.staffId,
    status: 'new',
})

const image = ref(null);
let file;

// Method to handle file change
function onFileChange (e) {
  file = e.target.files[0];
  if (!file) {
    console.log("no image selected/ or invalid image");
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    image.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const onSubmit = async (isNew) =>{
    isLoading.value = true
    const path = 'studentsImage/'

    //define if file has image 
    if(file){
        await uploadFile(file, path)
        studentData.value.imageUrl = downloadURL
    }
    //define if new
    if(isNew){
        try{
            createDocument(studentData.value)
            isLoading.value = false                     
            isOpen.value = false
        } catch(error){
            console.log(error);
        }
    } else{
        try{
            updateDocument( props.studentData.id, studentData.value,)
        } catch(error){
            console.log(error);
        }

    }

}
</script>

<template>
  <div>
    <UButton icon="i-heroicons-plus-16-solid" color="blue" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Add student
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <form @submit="onSubmit">
            <div class="flex flex-col gap-10">
                <div>
                    <p class="text-2xl text-gray-900 dark:text-white">Personal Details</p><br>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
                            <UInput v-model="studentData.fullname" type="text" name="name" id="name"/>
                        </div>
                        <div>
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                            <USelect variant="outline" :options="['Male', 'Female']" />
                        </div>
                        <div>
                            <label for="d-birth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                            <UInput type="date" v-model="studentData.date_of_birth" id="d-birth" />
                        </div>
                        <div>
                            <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Province</label>
                            <UInput v-model="studentData.province"  type="text" name="province" id="price" />
                        </div>
                        <div>
                            <label for="municipality" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Municipality</label>
                            <UInput v-model="studentData.municipality" type="text" name="municipality" id="municipality" />
                        </div>
                        <div>
                            <label for="barangay" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Barangay</label>
                            <UInput v-model="studentData.barangay" type="text" name="barangay" id="barangay" />
                        </div>
                        <div>
                            <label for="street" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street</label>
                            <UInput v-model="studentData.street" type="text" name="street" id="street"  placeholder="street"/>
                        </div>
                        <div>
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zone</label>
                            <UInput v-model="studentData.zone" type="text" name="price" id="price" placeholder="zone" />
                        </div>
                        <div>
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parents/Guardian</label>
                            <UInput v-model="studentData.parent" type="text" name="price" id="price" placeholder="parents/guardian" />
                        </div>
                        <div>
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Number</label>
                            <UInput v-model="studentData.contact_number" type="number" name="price" id="price" />
                        </div>
                        
                    </div>
                    <!-- Educational Detail -->
                </div>
                <div>
                    <p class="text-2xl text-gray-900 dark:text-white">Educational Details</p><br>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
                            <USelect variant="outline" :options="['I','II','III','IV','V','VI']" />
                        </div>
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                            <UInput v-model="studentData.section" type="text" />
                        </div>
                        <div>
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LRN</label>
                            <UInput v-model="studentData.lrn" type="number" />
                        </div>
                    </div>
                </div>
                <div style="width: 60vh">
                    <p class="text-2xl text-gray-900 dark:text-white">Upload</p><br>
                    <div class="mb-4">
                        <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Images</span>
                        <div class="flex flex-col gap-5 w-full">
                            <label for="dropzone-file" class="flex flex-col justify-center items-center w-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <img class="h-60 max-w-full" :src="image" alt="image description" v-if="image">
                                <!-- <img class="h-60 max-w-full" :src="studentData.imageUrl" alt="image description" v-else-if="studentData.imageUrl"> -->
                                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                                    
                                </div>
                            </label>
                            <input type="file" size="sm" @change="onFileChange"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <UButton label="Add student" color="blue" @click="onSubmit(true)" :loading="isLoading"/>
              <UButton label="Cancel" color="red" @click="isOpen = false"/>
            </div>
        </form>

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </UModal>
  </div>
</template>


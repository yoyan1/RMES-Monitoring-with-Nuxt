<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
const toast = useToast()

</script>

<template>
   <div class="p-4 bg-white rounded-lg ">
      <div class="grid grid-cols-3 gap-4 mb-4">
         <div class="flex justify-between border shadow shadow-2 p-3 rounded">
            <div>
                <span class="block text-xl font-medium mb-3">Student's</span>
                <div class="text-gray-900 font-medium text-lg">100</div>
            </div>
            <div class="flex items-center justify-center bg-primary-100 border-round p-5">
                <Icon name="heroicons:academic-cap" class="text-blue-600 text-3xl"/>
            </div>
        </div>
        
        <div class="flex justify-between border shadow shadow-2 p-3 rounded">
            <div>
                <span class="block text-xl font-medium mb-3">Teacher's</span>
                <div class="text-gray-900 font-medium text-lg">100</div>
            </div>
            <div class="flex items-center justify-center bg-primary-100 border-round p-5">
                <Icon name="heroicons:users" class="text-blue-600 text-3xl"/>
            </div>
        </div>
        <div class="flex justify-between border shadow shadow-2 p-3 rounded">
            <div>
                <span class="block text-xl font-medium mb-3">Archive's</span>
                <div class="text-gray-900 font-medium text-lg">3</div>
            </div>
            <div class="flex items-center justify-center bg-primary-100 border-round p-5">
                <Icon name="heroicons:archive-box-arrow-down-20-solid" class="text-blue-600 text-3xl"/>
            </div>
        </div>
      </div>
      <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
         <p class="text-2xl text-gray-400 dark:text-gray-500">
            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
         </p>
      </div>
      
    </div>
</template>


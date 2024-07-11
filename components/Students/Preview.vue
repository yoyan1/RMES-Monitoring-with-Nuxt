<script setup>
import PrinQR from './PrinQR.vue';
const props = defineProps({
    isOpen: Boolean,
    row: Object
})

const emits = defineEmits()
</script>

<template>
  <div>
    <UModal v-model="props.isOpen" fullscreen>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                Students
              </h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="emits('close')" />
            </div>
          </template>
          <div class="flex items-center mb-4 sm:mb-5">
                    <div class="w-full  bg-white  rounded-lg dark:border-gray-700">
                        <div class="flex items-center gap-5"><br><br>
                            <img class="w-28 h-28 rounded-full mb-3 shadow-lg" :src="row.imageUrl" alt="image" v-if="row.imageUrl"/>
                            <img class="w-28 h-28 rounded-full mb-3 shadow-lg" src="../components/images/default.jpg" alt="default" v-else/>
                            <div>
                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{row.fullname}} 
                                    <i class="px-5 rounded-full text-base bg-green-200" v-if="row.status == 'Present'">{{ row.status }}</i>
                                    <i class="px-5 rounded-full text-base bg-red-200" v-else-if="row.status == 'Out of school'">{{ row.status }}</i>
                                    <i class="px-5 rounded-full text-base bg-gray-200" v-else>{{ row.status }}</i>
                                </h5>
                                <span class="text-sm text-gray-500 dark:text-gray-400">Grade {{ row.level }}</span><br>
                                <span class="text-base text-blue-500 dark:text-gray-400"><i class="pi pi-map-marker"></i> {{ row.street }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between gap-10">
                    <dl class="sm:mb-5 border shadow px-6 py-3 rounded" style="width: 100vh">
                        <dt class="mb-2 text-xl leading-none text-gray-900 dark:text-white"><span>Student Details</span></dt>
                        <dd class="mb-4  sm:mb-5 dark:text-gray-400 ">
                            <div class="flex justify-between">
                                <div class="flex flex-col gap-5 py-2">
                                    <div>
                                        <span class="font-semibold text-gray-500">Fullname</span><br>
                                        <span class="text-gray-700 text-base">{{ row.fullname }}</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">LRN (<i>learner's Reference Number</i>)</span><br>
                                        <span class="text-gray-700 text-base">{{ row.lrn }}</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Adviser</span><br>
                                        <span class="text-gray-700 text-base">Rosmarie Panilagao</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Date of Birth</span><br>
                                        <span class="text-gray-700 text-sm">{{ row.date_of_birth }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="font-semibold text-gray-500">Province</span><br>
                                        <span class="text-gray-700 text-base">{{ row.province }}</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Barangay</span><br>
                                        <span class="text-gray-700 text-base">{{ row.barangay }}</span>
                                    </div> -->
                                </div>
                                <div class="flex flex-col py-2 gap-5">
                                    <div>
                                        <span class="font-semibold text-gray-500">Grade/Section</span><br>
                                        <span class="text-gray-700 text-base">Grade: {{ row.level }} - {{ row.section }}</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Status</span><br>
                                        <span class="text-gray-700 text-base">present</span>
                                    </div>
                                    <!-- <div>
                                        <span class="font-semibold text-white">gap</span><br>
                                        <span class="text-white text-base">gap</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Municipality</span><br>
                                        <span class="text-gray-700 text-base">{{ row.municipality }}</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Zone</span><br>
                                        <span class="text-gray-700 text-base">{{ row.zone }}</span>
                                    </div> -->
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl class="sm:mb-5 border shadow px-6 py-3 rounded" style="width: 70vh">
                        <dt class="mb-2 text-xl leading-none text-gray-900 dark:text-white flex justify-between">
                            <span>Attendance Record</span>
                            <div class="flex gap-1">
                                <button  class="text-base border px-5 text-blue-600 bg-blue-100 rounded">all</button>
                                <button  class="text-base border px-5 bg-gray-100 rounded">today</button>
                            </div>
                        </dt>
                        <dt class="mb-2 text-xl leading-none text-gray-900 dark:text-white">
                            <div class="flex gap-1">
                                <select name="" id="" class="bg-gray-100 border border-gray-300 text-base rounded">
                                    <option selected>Select date</option>
                                </select>
                            </div><hr class="border border-gray-200">
                            <div>
                                <!-- <DataTable :value="attendances" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" v-if="attendances.length != 0">
                                    <Column class="text-base" field="date" header="Date"></Column>
                                    <Column class="text-base" field="time_in" header="Time In"></Column>
                                    <Column class="text-base" field="time_out" header="Time Out"></Column>
                                </DataTable> -->
                                <!-- <div class="text-center" v-else>
                                    <span class="text-gray-400">No records yet</span>
                                </div> -->
                            </div>
                        </dt>
                        <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                <div class="relative overflow-x-auto">
                                    
                                </div>
                        </dd>
                    </dl>
                </div>
                <dl class="grid grid-cols-2 gap-4 mb-4">
                    <div class="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600">
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Parents/Guardian</dt>
                        <dd class="flex items-center text-gray-500 dark:text-gray-400">
                            {{ row.parent }}
                        </dd>
                    </div>
                    <div class="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600">
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Address</dt>
                        <dd class="flex items-center space-x-2 font-light text-gray-500 dark:text-gray-400">
                            {{ row.street + ', ' +  row.barangay + ', ' + row.municipality + ', ' + row.province}}
                            {{ 'zone: ' + row.zone  }}
                        </dd>
                    </div>
                    <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Contact Number</dt>
                        <dd class="text-gray-500 dark:text-gray-400">
                            {{ row.contact_number }}
                        </dd>
                    </div>
                </dl>
            <template #footer>
                <div>
                    <PrinQR :data="row"/>
                </div>
            </template>
        </UCard>
    </UModal>
  </div>
</template>


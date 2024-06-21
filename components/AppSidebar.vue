<script setup lang="ts">
const router = useRouter()

const routes = ref([
            {
                label: 'Students',
                icon: 'heroicons:academic-cap-16-solid',
                to: '/admin/students'
            },
            {
                label: 'Attendance',
                icon: 'heroicons:calendar-days-solid',
                to: '/admin/attendance'
            },
            {
                label: 'Request',
                icon: 'heroicons:inbox-arrow-down-16-solid',
                to: '/admin/requests'
            },
            {
                label: 'Archives',
                icon: 'heroicons:archive-box-20-solid',
                to: '/admin/archive'
            },
            {
                label: 'Accounts',
                icon: 'heroicons:user-group-solid',
                to: '/admin/accounts'
            },
            {
                label: 'Setting',
                icon: 'heroicons:cog-6-tooth-20-solid',
                to: '/admin/setting'
            }
    
]);
</script>
<template>
    <div>
        <aside class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidenav" id="drawer-navigation" >
            <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                <form action="#" method="GET" class="md:hidden mb-2">
                <label for="sidebar-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none" >
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" ></path>
                    </svg>                    </div>
                    <input type="text" name="search" id="sidebar-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
                </div>
                </form>
                <ul>
                    <li>
                        <h1 class="text-bold">Home</h1>
                        <NuxtLink active-class="bg-blue-600 text-white" to="/admin" class="flex items-center gap-3 p-2 text-gray-900 rounded-lg dark:text-white hover:text-white hover:bg-blue-600 dark:hover:bg-blue-700 group"><Icon name="heroicons:home-modern-solid"/> Dashboard</NuxtLink>
                    </li>
                    <li>
                        <h1 class="text-bold">Pages</h1>
                        <div v-for="route in routes" :key="route.to">
                            <NuxtLink active-class="bg-blue-600 text-white" :to="route.to" class="flex items-center gap-3 p-2 text-gray-900 rounded-lg dark:text-white hover:text-white hover:bg-blue-600 dark:hover:bg-blue-700 group"><Icon :name="route.icon" class="p-3"/> {{ route.label }}</NuxtLink>
                        </div>
                  </li>
                </ul>
            </div>
            
        </aside>
    </div>
</template>
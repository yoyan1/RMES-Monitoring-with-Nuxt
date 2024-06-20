
<template>
    <div class="card flex justify-center">
        <Menu :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate" class="font-bold hover:text-white">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <!-- <RouterLink v-else v-ripple :to="item.to" :target="item.target" v-bind="props.action" class="font-semibold hover:text-white">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </RouterLink> -->
            </template>
        </Menu>
    </div>
</template>

<script setup>
import { ref } from "vue";
// import { useRouter, RouterLink } from "vue-router";

// const router = useRouter();

const items = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/home/overview' }]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Students',
                icon: 'pi pi-fw pi-server',
                to: '/pages/students'
            },
            {
                label: 'Attendance',
                icon: 'pi pi-fw pi-calendar',
                to: '/pages/attendance'
            },
            {
                label: 'Request',
                icon: 'pi pi-fw pi-inbox',
                to: '/pages/request'
            },
            {
                label: 'Accounts',
                icon: 'pi pi-fw pi-users',
                to: '/pages/accounts'
            },
            {
                label: 'Setting',
                icon: 'pi pi-fw pi-cog',
                to: '/pages/setting'
            }
        ]
    },
]);
</script>

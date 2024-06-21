<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
        <AppHeader/>
        <AppSidebar/>
        <main class="p-4 md:ml-64 pt-20 ">
            <slot />
        </main>
    </div>
</template>
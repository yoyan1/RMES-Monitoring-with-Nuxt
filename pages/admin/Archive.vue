<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

</script>
<template>
    <div class="p-4 border-2 bg-white border-gray-200 rounded">
      <h1 class="text-2xl">Archive Students</h1>
        <div class="mb-4 rounded">
          <NuxtLink to="/admin/archives/"><UButton  label="2024-2025"/></NuxtLink>
          <slot/>
        </div>
    </div>
</template>
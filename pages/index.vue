<script setup>
// import { useAuth } from '~/compasables/useAuth';

// const route = useRouter()

// const {login} = useAuth()
// const loading = ref(false)

// const state = reactive({
//   email: undefined,
//   password: undefined
// })

// const form = ref()

// async function onSubmit () {
//   loading.value = true
//   try {
//     const response = await login(state.email, state.password)
//     console.log("success");
//     route.push('/admin')
//     loading.value = false
//   } catch (err) {
//     console.error("error", err);
//     loading.value = false

//   }
// }
</script>

<template>
    <div class="container mx-auto flex flex-col items-center gap-3 drop-shadow-lg">
        <img src="/RMES-logo.png" width="100px" alt="">
        <div class="bg-white flex flex-col items-center rounded-xl" style="padding: 3rem 5rem">
            <img src="/RMES-logo.png" width="50px">
            <h4>Welcome, Admin!</h4>
            <p>Sign in to continue</p>
            <div class="w-60 py-5">
                <!-- <UForm ref="form" :state="state" @submit="onSubmit" class="flex flex-col gap-5">
                  <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email"  :ui="{ color:{white: {outline: 'focus:ring-blue-600' }}  }" />
                  </UFormGroup>
              
                  <UFormGroup label="Password" name="password">
                    <UInput v-model="state.password" type="password" :ui="{ color:{white: {outline: 'focus:ring-blue-600' }}  }"  />
                  </UFormGroup>
              
                  <UButton :loading="loading" type="submit" color="blue"  :ui="{padding: { xl: 'px-10 py-10',}, size:{xl: 'text-1xl',}}">
                    Submit
                  </UButton>
                </UForm> -->
            </div>
        </div>
    </div>
</template>

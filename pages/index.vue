<script setup>
// import { useAuth } from '~/compasables/useAuth';

const route = useRouter()

// const {login} = useAuth()
// const loading = ref(false)

// const state = reactive({
//   email: undefined,
//   password: undefined
// })

// const form = ref()

async function onSubmit () {
//   loading.value = true
//   try {
//     const response = await login(state.email, state.password)
//     console.log("success");
    route.push('/admin')
//     loading.value = false
//   } catch (err) {
//     console.error("error", err);
//     loading.value = false

//   }
}
</script>

<template>
  <div class="bg-gray-100 flex justify-center items-center h-screen">
      <!-- Left: Image -->
  <div class="w-1/2 h-screen hidden lg:block">
    <img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" class="object-cover w-full h-full">
  </div>
  <!-- Right: Login Form -->
  <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
    <h1 class="text-2xl font-semibold mb-4">Login</h1>
    <form @submit="onSubmit()">
      <!-- Username Input -->
      <div class="mb-4">
        <label for="username" class="block text-gray-600">Username</label>
        <input type="text" id="username" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
      </div>
      <!-- Password Input -->
      <div class="mb-4">
        <label for="password" class="block text-gray-600">Password</label>
        <input type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
      </div>
      <!-- Remember Me Checkbox -->
      <div class="mb-4 flex items-center">
        <input type="checkbox" id="remember" name="remember" class="text-blue-500">
        <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
      </div>
      <!-- Forgot Password Link -->
      <div class="mb-6 text-blue-500">
        <a href="#" class="hover:underline">Forgot Password?</a>
      </div>
      <!-- Login Button -->
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
    </form>
    <!-- Sign up  Link -->
    <div class="mt-6 text-blue-500 text-center">
      <a href="#" class="hover:underline">Sign up Here</a>
    </div>
  </div>
  </div>  
</template>

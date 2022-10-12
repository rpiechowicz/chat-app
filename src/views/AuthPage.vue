<script setup lang="ts">
import { logIn } from '../store/user'

const router = useRouter()

const name = ref<string>('')

const technologies = ref<string[]>([
  'Vue 3',
  'TypeScript',
  'Vite',
  'Socket.io',
  'Node',
  'Tailwind',
  'Auto Import Components'
])

const loginUser = async (): Promise<void> => {
  if (name.value.length <= 2) return

  logIn({
    name: name.value
  })

  await router.push({ name: 'home' })
}
</script>

<template>
  <div class="login-page">
    <div class="form">
      <div class="container-form">
        <h1>Log In</h1>
        <Input v-model="name" label="Name" />
        <Button end @click="loginUser">Log In</Button>
      </div>
    </div>
    <div class="info">
      <div class="container">
        <h2>Stack Technology 🎉</h2>
        <p class="pb-4">Check out what was used to create this app.</p>

        <div v-for="item in technologies" :key="item">
          <span>- {{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.login-page
  display: grid
  grid-template-columns: 5fr 3fr
  height: 100%
  width: 100%
  text-align: left

  >.form
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    h1
      font-size: 70px

  >.info
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    background-color: var(--color-gray-tint-light)

    h2
      font-size: 30px

  .container
    width: 70%

  .container-form
    width: 50%
</style>

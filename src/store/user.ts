import { User } from '../types/User'

const userStore = useStorage('user-store', { user: {}, isLogged: false }, localStorage)

export const isLogged = computed<boolean>(() => userStore.value.isLogged)

export const logIn = (user: User): void => {
  userStore.value.user = user
  userStore.value.isLogged = true
}

export const logOut = (): void => {
  userStore.value.user = {}
  userStore.value.isLogged = false
}

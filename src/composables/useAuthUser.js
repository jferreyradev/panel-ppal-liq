import { ref } from 'vue'

const user = ref('')

export function useAuthUser() {
  function setUser(newUser) {
    user.value = newUser
  }
  function clearUser() {
    user.value = ''
  }
  return {
    user,
    setUser,
    clearUser,
  }
}
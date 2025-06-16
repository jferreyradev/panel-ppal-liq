import { ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)
  const error = ref(null)

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      error.value = null
      setTimeout(() => (copied.value = false), 1500)
    } catch (err) {
      error.value = err
      copied.value = false
    }
  }

  return { copy, copied, error }
}

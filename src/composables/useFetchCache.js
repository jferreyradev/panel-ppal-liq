import { ref, watch, isRef } from 'vue'

const cacheMap = new Map()

export function useFetchCache(key, url, options = {}, auto = true, useCache = true) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  let abortController = null

  async function fetchData() {
    if (useCache && cacheMap.has(key.value)) {
      data.value = cacheMap.get(key.value)
      return
    }
    loading.value = true
    error.value = null
    abortController?.abort()
    abortController = new AbortController()
    try {
      const res = await fetch(isRef(url) ? url.value : url, {
        ...options,
        signal: abortController.signal,
      })
      if (!res.ok) throw new Error(res.statusText)
      const result = await res.json()
      data.value = result
      if (useCache) cacheMap.set(key.value, result)
    } catch (err) {
      if (err.name !== 'AbortError') error.value = err
    } finally {
      loading.value = false
    }
  }

  async function reload() {
    if (!loading.value) await fetchData()
  }

  function cancel() {
    abortController?.abort()
  }

  function clear() {
    cacheMap.delete(key.value)
  }

  if (auto) {
    if (isRef(key) || isRef(url) || typeof key === 'function' || typeof url === 'function') {
      watch([key, url], fetchData, { immediate: true })
    } else {
      fetchData()
    }
  }

  return { data, loading, error, reload, cancel, clear }
}

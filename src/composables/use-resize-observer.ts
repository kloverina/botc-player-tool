import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useResizeObserver(
  target: Ref<HTMLElement | null>,
  callback: ResizeObserverCallback,
) {
  const observer = new ResizeObserver(callback)

  onMounted(() => {
    if (target.value) observer.observe(target.value)
  })

  onUnmounted(() => observer.disconnect())
}

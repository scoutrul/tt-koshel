import type { Ref } from 'vue'

export interface DeletionTimer {
  timerId: number
  timeLeft: number
}

export type PendingDeletionsRef = Ref<Set<number>>
export type DeletionTimersRef = Ref<Record<number, DeletionTimer>>

export const startDeletionTimer = (
  id: number,
  onExpire: (id: number) => void,
  pendingDeletions: PendingDeletionsRef,
  deletionTimers: DeletionTimersRef,
) => {
  pendingDeletions.value.add(id)

  const timerId = setInterval(() => {
    const timer = deletionTimers.value[id]
    if (!timer) return

    timer.timeLeft--

    if (timer.timeLeft > 0) return

    onExpire(id)
    pendingDeletions.value.delete(id)

    clearInterval(timer.timerId)
    delete deletionTimers.value[id]
  }, 1000)

  deletionTimers.value[id] = {
    timerId,
    timeLeft: 10,
  }
}

export const cancelDeletionTimer = (
  id: number,
  pendingDeletions: PendingDeletionsRef,
  deletionTimers: DeletionTimersRef,
) => {
  pendingDeletions.value.delete(id)

  const timer = deletionTimers.value[id]
  if (timer) {
    clearInterval(timer.timerId)
    delete deletionTimers.value[id]
  }
}

export const clearAllDeletionTimers = (
  pendingDeletions: PendingDeletionsRef,
  deletionTimers: DeletionTimersRef,
) => {
  Object.values(deletionTimers.value).forEach(timer => {
    clearInterval(timer.timerId)
  })
  deletionTimers.value = {}
  pendingDeletions.value.clear()
}



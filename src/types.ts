export interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  completedAt: Date | null
}

export type TaskFilter = 'all' | 'active' | 'completed'

export type TaskEventAction = 'created' | 'completed' | 'reopened' | 'deleted'

export interface TaskEvent {
  id: number
  taskId: number
  titleShort: string
  action: TaskEventAction
  timestamp: Date
}



import React from 'react'

interface TaskEditContentProps {
  taskId: string
}

export function TaskEditContent({ taskId }: TaskEditContentProps) {
  return <div>{taskId}</div>
}

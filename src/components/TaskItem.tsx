import React from 'react'
import { ListItem } from '@material-ui/core'
import { Task } from '../state'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  return <ListItem aria-label={'task-item'}>{task.name}</ListItem>
}

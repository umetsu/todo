import { List } from '@material-ui/core'
import React from 'react'
import { TaskItem } from './TaskItem'
import { Task } from '../model'

interface TaskListProps {
  tasks: ReadonlyArray<Task>
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <List>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </List>
  )
}

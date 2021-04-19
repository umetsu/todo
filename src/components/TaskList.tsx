import { List } from '@material-ui/core'
import React from 'react'
import { TaskItem } from './TaskItem'
import { Task } from '../model'

interface TaskListProps {
  uncompletedTasks: ReadonlyArray<Task>
  completedTasks: ReadonlyArray<Task>
}

export function TaskList({ uncompletedTasks, completedTasks }: TaskListProps) {
  return (
    <List>
      {uncompletedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {completedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </List>
  )
}

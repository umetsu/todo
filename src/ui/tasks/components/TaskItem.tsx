import React, { useCallback } from 'react'
import {
  Checkbox,
  createStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { Task } from '../models'
import Link from 'next/link'
import { useChangeCompleted } from '../hooks/useChangeCompleted'

interface Props {
  task: Task
}

export function TaskItem({ task }: Props) {
  const { changeCompleted } = useChangeCompleted(task)
  const classes = useStyles({ completed: task.completed })

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      changeCompleted(checked)
    },
    [changeCompleted]
  )

  return (
    <ListItem button aria-label={'task-item'}>
      <ListItemIcon>
        <Checkbox checked={task.completed} onChange={handleChange} />
      </ListItemIcon>
      <Link href={'/edit/[taskId]'} as={`/edit/${task.id}`}>
        <ListItemText className={classes.taskText}>{task.name}</ListItemText>
      </Link>
    </ListItem>
  )
}

interface StyleProps {
  completed: boolean
}

const useStyles = makeStyles<Theme, StyleProps>(() =>
  createStyles({
    taskText: {
      textDecoration: ({ completed }: StyleProps) => {
        return completed ? 'line-through' : 'none'
      },
    },
  })
)

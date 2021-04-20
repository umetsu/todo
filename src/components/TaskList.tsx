import {
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { TaskItem } from './TaskItem'
import { Task } from '../model'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

interface TaskListProps {
  uncompletedTasks: ReadonlyArray<Task>
  completedTasks: ReadonlyArray<Task>
}

export function TaskList({ uncompletedTasks, completedTasks }: TaskListProps) {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const handleClick = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  const numOfCompletedTasks = completedTasks.length
  const showCompletedTasks = numOfCompletedTasks > 0

  return (
    <List>
      {uncompletedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {showCompletedTasks && (
        <div className={classes.completed}>
          <ListItem button onClick={handleClick}>
            <ListItemText>
              完了したタスク ({numOfCompletedTasks}件)
            </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </List>
          </Collapse>
        </div>
      )}
    </List>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    completed: {
      marginTop: theme.spacing(2),
    },
  })
)

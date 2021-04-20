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

  const [openCompletedTasks, setOpenCompletedTasks] = useState(false)
  const handleCollapseToggleClick = useCallback(() => {
    setOpenCompletedTasks((open) => !open)
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
          <ListItem button onClick={handleCollapseToggleClick}>
            <ListItemText>
              完了したタスク ({numOfCompletedTasks}件)
            </ListItemText>
            {openCompletedTasks ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCompletedTasks} timeout="auto" unmountOnExit>
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

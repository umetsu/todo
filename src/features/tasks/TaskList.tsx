import {
  Collapse,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { TaskItem } from './TaskItem'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { useTasks } from './hooks'

export function TaskList() {
  const classes = useStyles()
  const { uncompletedTasks, completedTasks } = useTasks()

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
        <>
          <Divider />
          <ListItem button onClick={handleCollapseToggleClick}>
            <ListItemText className={classes.completedTask}>
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
        </>
      )}
    </List>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    completedTask: {
      paddingLeft: theme.spacing(1.5),
    },
  })
)

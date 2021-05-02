import React, { useCallback } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { useDeleteAllCompletedTasks } from '../../hooks/useDeleteAllCompletedTasks'
import { useDeleteAllCompletedTasksConfirmDialog } from '../../hooks/useDeleteAllCompletedTasksConfirmDialog'
import { useTasks } from '../../hooks/useTasks'

export function DeleteAllCompletedTasksConfirmDialog() {
  const { completedTasks } = useTasks()
  const {
    opened,
    closeConfirmDialog,
  } = useDeleteAllCompletedTasksConfirmDialog()
  const { deleteAllCompletedTasks } = useDeleteAllCompletedTasks()
  const numOfCompletedTasks = completedTasks.length

  const handleCancel = useCallback(() => {
    closeConfirmDialog()
  }, [closeConfirmDialog])

  const handleDelete = useCallback(() => {
    deleteAllCompletedTasks(completedTasks)
    closeConfirmDialog()
  }, [closeConfirmDialog, completedTasks, deleteAllCompletedTasks])

  return (
    <Dialog open={opened} onClose={closeConfirmDialog}>
      <DialogTitle>完了済みのタスクの削除</DialogTitle>
      <DialogContent>
        <DialogContentText>
          完了済みになっている{numOfCompletedTasks}
          件のタスクを削除します。よろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" autoFocus onClick={handleCancel}>
          キャンセル
        </Button>
        <Button color="primary" onClick={handleDelete}>
          削除
        </Button>
      </DialogActions>
    </Dialog>
  )
}

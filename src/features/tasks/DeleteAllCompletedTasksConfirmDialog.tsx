import React, { useCallback } from 'react'
import {
  useDeleteAllCompletedTasks,
  useDeleteAllCompletedTasksConfirmDialog,
} from './hooks'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

export function DeleteAllCompletedTasksConfirmDialog() {
  const {
    opened,
    closeConfirmDialog,
  } = useDeleteAllCompletedTasksConfirmDialog()
  const {
    numOfCompletedTasks,
    deleteAllCompletedTasks,
  } = useDeleteAllCompletedTasks()

  const handleCancel = useCallback(() => {
    closeConfirmDialog()
  }, [closeConfirmDialog])

  const handleDelete = useCallback(() => {
    deleteAllCompletedTasks()
    closeConfirmDialog()
  }, [closeConfirmDialog, deleteAllCompletedTasks])

  return (
    <Dialog open={opened} onClose={closeConfirmDialog}>
      <DialogTitle>完了済みのタスクの削除</DialogTitle>
      <DialogContent>
        <DialogContentText>
          完了済みになっている{numOfCompletedTasks}
          件のタスクを全て削除します。よろしいですか？
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

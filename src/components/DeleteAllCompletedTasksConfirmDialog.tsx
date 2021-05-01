import React, { useCallback } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { useDeleteAllCompletedTasks } from '../hooks/useDeleteAllCompletedTasks'
import { useDeleteAllCompletedTasksConfirmDialog } from '../hooks/useDeleteAllCompletedTasksConfirmDialog'

export function DeleteAllCompletedTasksConfirmDialog() {
  const {
    opened,
    closeConfirmDialog,
  } = useDeleteAllCompletedTasksConfirmDialog()
  const { deleteAllCompletedTasks } = useDeleteAllCompletedTasks()
  // TODO: 完了済みタスクの件数を取得
  const numOfCompletedTasks = 0

  const handleCancel = useCallback(() => {
    closeConfirmDialog()
  }, [closeConfirmDialog])

  const handleDelete = useCallback(() => {
    // TODO: 完了済みタスクを渡す
    deleteAllCompletedTasks([])
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

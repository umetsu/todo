import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

interface Props {
  open: boolean
  numOfCompletedTasks: number
  onClose: () => void
  onDeleteTasksClick: () => void
}

export function DeleteAllCompletedTasksConfirmDialog({
  open,
  numOfCompletedTasks,
  onClose,
  onDeleteTasksClick,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>完了済みのタスクの削除</DialogTitle>
      <DialogContent>
        <DialogContentText>
          完了済みになっている{numOfCompletedTasks}
          件のタスクを削除します。よろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" autoFocus onClick={onClose}>
          キャンセル
        </Button>
        <Button color="primary" onClick={onDeleteTasksClick}>
          削除
        </Button>
      </DialogActions>
    </Dialog>
  )
}

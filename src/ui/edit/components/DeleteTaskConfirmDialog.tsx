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
  onClose: () => void
  onDeleteTask: () => void
}

export function DeleteTaskConfirmDialog({
  open,
  onClose,
  onDeleteTask,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>タスクの削除</DialogTitle>
      <DialogContent>
        <DialogContentText>
          タスクを削除します。よろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" autoFocus onClick={onClose}>
          キャンセル
        </Button>
        <Button color="primary" onClick={onDeleteTask}>
          削除
        </Button>
      </DialogActions>
    </Dialog>
  )
}

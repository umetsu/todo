import React, { useCallback } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { useDeleteTaskConfirmDialog } from '../../hooks/useDeleteTaskConfirmDialog'
import { useDeleteTask } from '../../hooks/useDeleteTask'
import { useTask } from '../../hooks/useTask'
import { useRouter } from 'next/router'

interface Props {
  taskId: string
}

export function DeleteTaskConfirmDialog({ taskId }: Props) {
  const { task } = useTask(taskId)
  const { deleteTask } = useDeleteTask()
  const { opened, closeConfirmDialog } = useDeleteTaskConfirmDialog()
  const router = useRouter()

  const handleCancel = useCallback(() => {
    closeConfirmDialog()
  }, [closeConfirmDialog])

  const handleDelete = useCallback(() => {
    deleteTask(task)
    closeConfirmDialog()
    void router.replace('/')
  }, [closeConfirmDialog, deleteTask, router, task])

  return (
    <Dialog open={opened} onClose={closeConfirmDialog}>
      <DialogTitle>タスクの削除</DialogTitle>
      <DialogContent>
        <DialogContentText>
          タスクを削除します。よろしいですか？
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

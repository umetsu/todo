import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const formAtom = atom({
  key: 'formAtom',
  default: {
    createTaskFormOpened: false,
    inputTaskName: '',
  },
})

export function useCreateTaskForm() {
  const [state, setState] = useRecoilState(formAtom)

  const openCreateTaskForm = useCallback(() => {
    setState((state) => ({ ...state, createTaskFormOpened: true }))
  }, [setState])

  const closeCreateTaskForm = useCallback(() => {
    setState((state) => ({
      ...state,
      createTaskFormOpened: false,
      inputTaskName: '',
    }))
  }, [setState])

  const changeInputTaskName = useCallback(
    (input: string) => {
      setState((state) => ({ ...state, inputTaskName: input }))
    },
    [setState]
  )

  return {
    createTaskFormOpened: state.createTaskFormOpened,
    inputTaskName: state.inputTaskName,
    openCreateTaskForm,
    closeCreateTaskForm,
    changeInputTaskName,
  }
}

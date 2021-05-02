import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Ghost } from 'react-kawaii'

interface Props {
  message: string
}

export function ErrorFallback({ message }: Props) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100%'}
    >
      <Ghost size={140} mood={'ko'} />
      <Typography>エラーが発生しました</Typography>
      <Typography>{message}</Typography>
    </Box>
  )
}

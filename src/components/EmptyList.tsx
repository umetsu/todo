import React from 'react'
import { Cat } from 'react-kawaii'
import { Box, Typography } from '@material-ui/core'

export function EmptyList() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      style={{
        height: '100%',
      }}
    >
      <Cat size={140} mood={'excited'} />
      <Typography>タスクが空のようです</Typography>
      <Typography>タスクを追加してみましょう！</Typography>
    </Box>
  )
}

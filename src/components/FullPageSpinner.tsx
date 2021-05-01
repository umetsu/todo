import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

export function FullPageSpinner() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
    >
      <CircularProgress aria-label={'loading'} />
    </Box>
  )
}

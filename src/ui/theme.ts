import { createMuiTheme } from '@material-ui/core/styles'
import lightGreen from '@material-ui/core/colors/lightGreen'
import indigo from '@material-ui/core/colors/indigo'

export const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: indigo,
  },
  mixins: {
    toolbar: {
      // スマホのキーボードが出てくると横向きとして認識されて48pxになってしまったので定義しなおす
      // https://github.com/mui-org/material-ui/issues/7454#issuecomment-315933570
      minHeight: '64px',
      ['@media (max-width: 959px) and (orientation: landscape)']: {
        minHeight: '48px',
      },
      ['@media (max-width: 599px)']: {
        minHeight: '56px',
      },
    },
  },
})

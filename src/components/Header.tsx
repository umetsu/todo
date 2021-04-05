import { AppBar, Toolbar, Typography } from '@material-ui/core'

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Next.js Template</Typography>
      </Toolbar>
    </AppBar>
  )
}

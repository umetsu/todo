import React, { useCallback } from 'react'
import { useUser } from '../hooks/auth/useUser'
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import { useSideDrawer } from '../hooks/useSideDrawer'

export function SideDrawer() {
  const classes = useStyles()
  const { user, logout } = useUser()
  const { opened, closeSideDrawer } = useSideDrawer()

  const handleLogoutClick = useCallback(() => {
    void logout()
    closeSideDrawer()
  }, [closeSideDrawer, logout])

  return (
    <Drawer
      open={opened}
      anchor={'left'}
      onClose={closeSideDrawer}
      ModalProps={{
        BackdropProps: {
          'aria-label': 'backdrop',
        },
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        className={classes.drawerContent}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          className={classes.profile}
        >
          <Avatar
            src={user?.photoURL ?? undefined}
            alt={user?.displayName ?? undefined}
            className={classes.avatar}
            aria-label={'avatar'}
          />
          <Typography variant={'h6'} className={classes.userName}>
            {user?.displayName}
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={handleLogoutClick}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>ログアウト</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  drawerContent: {
    width: '260px',
  },
  profile: {
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: `0 auto`,
  },
  userName: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    overflowWrap: 'break-word',
  },
}))

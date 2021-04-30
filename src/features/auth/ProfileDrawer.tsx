import React, { useCallback } from 'react'
import { useProfile, useUser } from './hooks'
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

export function ProfileDrawer() {
  const classes = useStyles()
  const { user, logout } = useUser()
  const { profileOpened, closeProfile } = useProfile()

  const handleLogoutClick = useCallback(() => {
    void logout()
    closeProfile()
  }, [closeProfile, logout])

  return (
    <Drawer open={profileOpened} anchor={'left'} onClose={closeProfile}>
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

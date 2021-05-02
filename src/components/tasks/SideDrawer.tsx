import React from 'react'
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
import { User } from '../../models/auth'

interface Props {
  open: boolean
  user: User | null | undefined
  onClose: () => void
  onLogoutClick: () => void
}

export function SideDrawer({ open, user, onClose, onLogoutClick }: Props) {
  const classes = useStyles()

  return (
    <Drawer
      open={open}
      anchor={'left'}
      onClose={onClose}
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
          <ListItem button onClick={onLogoutClick}>
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

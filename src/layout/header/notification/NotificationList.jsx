import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

const ListItemWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        p: 2,
        BorderBottom: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'primary.light',
        },
      }}
    >
      {children}
    </Box>
  );
};

ListItemWrapper.propTypes = {
  children: PropTypes.node,
};

export const NotificationList = () => {
  const theme = useTheme();

  const chipSX = {
    height: 24,
    padding: '0.6px',
  };

  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    marginRigth: '5px',
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light,
  };

  const chipSuccessSX = {
    ...chipSX,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    height: 28,
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 330,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 300,
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22,
        },
        '& .MuiDivider-root': {
          my: 0,
        },
        '& .list-container': {
          pl: 7,
        },
      }}
    >
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="Jhon Doe" src={null} />
          </ListItemAvatar>
          <ListItemText primary="John Doe" />
          <Box sx={{ position: 'absolute', right: 16 }}>
            <Grid container justifyContent="flex-end">
              <Grid size={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid size={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">
              It is a long established fact that a reader will be distracted
            </Typography>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid>
                <Chip label="Unread" sx={chipErrorSX} />
              </Grid>
              <Grid>
                <Chip label="New" sx={chipWarningSX} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>

      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar
              sx={{
                color: theme.palette.success.dark,
                backgroundColor: theme.palette.success.light,
                border: 'none',
                borderColor: theme.palette.success.main,
              }}
            >
              {/* lore icon */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="subtitle1">
                Store Verification Done
              </Typography>
            }
          />
          <Box sx={{ position: 'absolute', right: 16 }}>
            <Grid container justifyContent="flex-end">
              <Grid size={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid size={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">
              We have successfully received your request.
            </Typography>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid>
                <Chip label="Unread" sx={chipErrorSX} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>

      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar
              sx={{
                color: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light,
                border: 'none',
                borderColor: theme.palette.primary.main,
              }}
            >
              {/* lorem icon */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="subtitle1">Check Your Mail.</Typography>
            }
          />
          <Box sx={{ position: 'absolute', right: 16 }}>
            <Grid container justifyContent="flex-end">
              <Grid>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid size={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">
              All done! Now check your inbox as you&apos;re in for a sweet
              treat!
            </Typography>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid>
                {/* lore icon */}
                <Button variant="contained" disableElevation endIcon={'icono'}>
                  Mail
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>

      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="John Doe" src={null} />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle1">John Doe</Typography>}
          />
          <Box sx={{ position: 'absolute', right: 16 }}>
            <Grid container justifyContent="flex-end">
              <Grid size={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid size={12} sx={{ pb: 2 }}>
            <Typography component="span" variant="subtitle2">
              Uploaded two file on &nbsp;
              <Typography component="span" variant="h6">
                21 Jan 2020
              </Typography>
            </Typography>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid size={12}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                  }}
                >
                  <CardContent>
                    <Grid container direction="column">
                      <Grid size={12}>
                        <Stack direction="row" spacing={2}>
                          {/* lorem icon */}
                          <Typography variant="subtitle1">demo.jpg</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>

      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="John Doe" src={null} />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle1">John Doe</Typography>}
          />
          <Box sx={{ position: 'absolute', right: 16 }}>
            <Grid container justifyContent="flex-end">
              <Grid size={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid size={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">
              It is a long established fact that a reader will be distracted
            </Typography>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid>
                <Chip label="Confirmation of Account." sx={chipSuccessSX} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
    </List>
  );
};

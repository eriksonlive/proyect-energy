import { useState } from 'react';
import { CardBaseComponent } from 'base';
import {
  Avatar,
  Box,
  Grid2 as Grid,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

export const CardComponent = ({ isLoading }) => {
  const theme = useTheme();

  const [anchoEl, setAnchoEl] = useState(null);

  const handleClick = ({ currentTarget }) => {
    setAnchoEl(currentTarget);
  };

  const handleClose = () => {
    setAnchoEl(null);
  };

  return (
    <>
      {isLoading ? (
        cargando
      ) : (
        <CardBaseComponent
          sx={{
            bgcolor: "secondary.800",
            color: "#fff",
            overflow: "hidden",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              width: 210,
              height: 210,
              background: theme.palette.secondary.main,
              borderRadius: "50%",
              top: { xs: -105, sm: -85 },
              right: { xs: -140, sm: -95 },
            },
            "&:before": {
              content: '""',
              position: "absolute",
              width: 210,
              height: 210,
              background: theme.palette.secondary.main,
              borderRadius: "50%",
              top: { xs: -155, sm: -125 },
              right: { xs: -70, sm: -15 },
              opacity: 0.5,
            },
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid>
                <Grid container justifyContent="space-between">
                  <Grid>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        bgcolor: "secondary.main",
                        mt: 1,
                        color: "white",
                      }}
                    ></Avatar>
                  </Grid>
                  <Grid>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        bgcolor: "secondary.dark",
                        color: "secondary.200",
                        zIndex: 1,
                      }}
                      aria-controls="menu-earning-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreHorizIcon fontSize="inherit" />
                    </Avatar>
                    <Menu
                      id="menu-earning-card"
                      anchorEl={anchoEl}
                      keepMounted
                      open={Boolean(anchoEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid container alignItems="center">
                  <Grid>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      $ 100.000
                    </Typography>
                  </Grid>
                  <Grid>
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        ...theme.typography.smallAvatar,
                        bgcolor: "secondary.200",
                        color: "secondary.dark",
                      }}
                    >
                      <ArrowUpwardIcon
                        fontSize="inherit"
                        sx={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
                      />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "secondary.200",
                  }}
                >
                  Total Earning
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardBaseComponent>
      )}
    </>
  );
};

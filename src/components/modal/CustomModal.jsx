import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { MainCard } from 'ui-component';

export const CustomModal = ({
  children,
  buttonName,
  buttonPorps,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} {...buttonPorps}>
        {buttonName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          transition: "opacity 1s ease-in-out",
        }}
        {...props}
      >
        <MainCard sx={style}>
          <Box sx={{ p: 1, mb: 1 }}>
            <Typography variant="title">Lorem ipsum</Typography>
          </Box>
          {children}
        </MainCard>
      </Modal>
    </>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "75vw",
  height: "75vh",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #c4c4c4",
  boxShadow: 24,
  p: 0,
  transition: "opacity 1s ease-in-out",
  maxWidth: "100vw", // Máximo ancho que puede ocupar
  maxHeight: "100vh", // Máxima altura que puede ocupar
  overflow: "auto",
  "::-webkit-scrollbar": {
    width: "12px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "6px",
    border: "2px solid #ccc",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
    borderRadius: "6px",
  },
  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
};

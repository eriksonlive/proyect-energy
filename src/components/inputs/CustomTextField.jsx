import { Box, FormGroup, TextField, Typography } from '@mui/material';
import { CustomLabel } from '.';

export const CustomTextField = ({label, error, ...props }) => {

  return (
    <FormGroup sx={{ mb: 1 }}>
      <Box
        sx={{
          width: "100%",
          border: `1px solid ${error ? "red" : ""}`,
          borderRadius: 1,
        }}
      >
        {label && (
          <CustomLabel
            variant="subtitle2"
            sx={{
              pt: 1,
              pl: 1.4,
              color: error ? "red" : "",
              ...label?.sx,
            }}
            title={label?.title}
          />
        )}
        <TextField
          size="small"
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "0em .9em .5em .9em !important",
            },
          }}
          {...props}
        />
      </Box>
      {error && (
        <Typography variant="subtitle2" color={"red"} sx={{ ml: 1 }}>
          {error}
        </Typography>
      )}
    </FormGroup>
  );
};
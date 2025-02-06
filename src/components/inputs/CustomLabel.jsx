import { styled, Typography } from '@mui/material';

const Label = styled(Typography)(({theme}) =>({

}))

export const CustomLabel = ({title, sx, ...props}) => {

  return (
    <Label sx={sx} {...props}>{title}</Label>
  )
}

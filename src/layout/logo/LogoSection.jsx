import { ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router';
import { Logo } from 'ui-component';

export const LogoSection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <ButtonBase onClick={handleClick}>
      <Logo />
    </ButtonBase>
  );
};

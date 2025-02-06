import { Divider } from '@mui/material';
import { CustomModal } from 'components';
import { CreateCustomerForm } from 'forms';
import { MainCard } from 'ui-component';

const example = [
  { id: 0, title: "User Profile", subTitle: "Ajustes de perfil" },
  { id: 1, title: "lorem 2", subTitle: "ipsum 2" },
  { id: 2, title: "lorem 3", subTitle: "ipsum 3" },
  { id: 3, title: "lorem 4", subTitle: "ipsum 4" },
  { id: 4, title: "lorem 5", subTitle: "ipsum 5" },
];

export const CustomersPage = () => {
  return (
    <MainCard>
      <CustomModal buttonName="Modal">
        <Divider />
        <CreateCustomerForm />
      </CustomModal>
    </MainCard>
  );
};

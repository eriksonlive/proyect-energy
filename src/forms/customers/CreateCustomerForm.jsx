import { Grid2 as Grid } from '@mui/material';
import { CustomField, VerticalTabs } from 'components';
import { Form, Formik } from 'formik';

const example = [
  {id: 0, title: 'Información Personal'},
  {id: 1, title: 'Información de Contacto'},
];

const items = [
  { value: 1, title: "Masculino" },
  { value: 2, title: "Femenino" },
  { value: 3, title: "MK" }
];

export const CreateCustomerForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        lastName: '',
        sexo: 0
      }}
    >
      {({handleChange}) => (
        <Form>
          <VerticalTabs dataTabs={example}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <CustomField
                  label={{
                    title: "Nombre",
                  }}
                  textfield={{
                    // label: "Nombre",
                  }}
                />
              </Grid>
              <Grid size={6}>
                <CustomField
                  label={{
                    title: "Apellido",
                  }}
                  textfield={{
                    // label: "Nombre",
                  }}
                />
              </Grid>
              <Grid size={6}>
                <CustomField
                  type="select"
                  label={{
                    title: "Sexo",
                  }}
                  select={{
                    name: 'sexo',
                    data: items,
                    value: 0,
                    onChange: handleChange
                  }}
                />
              </Grid>
            </Grid>
          </VerticalTabs>
        </Form>
      )}
    </Formik>
  );
};

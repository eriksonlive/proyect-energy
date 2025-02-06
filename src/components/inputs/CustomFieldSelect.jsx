import { MenuItem, Select } from '@mui/material';

const items = [
  { value: 1, title: 'Example 1' },
  { value: 2, title: 'Example 2' },
  { value: 3, title: 'Example 3' },
  { value: 4, title: 'Example 4' },
  { value: 5, title: 'Example 5' },
];

export const CustomFieldSelect = ({ value = '', ...props }) => {
  const { sx, onChange, data } = {
    sx: props?.sxSelect,
    onChange: props?.onChange,
    data: props?.data ? props.data : items,
  };

  return (
    <Select value={value} sx={sx} onChange={onChange} {...props} displayEmpty>
      <MenuItem value="" disabled={value === ''}>
        Seleccione una opción
      </MenuItem>
      {data.map((item) => (
        <MenuItem key={item?.value} value={item?.value}>
          {item?.title}
        </MenuItem>
      ))}
    </Select>
  );
};

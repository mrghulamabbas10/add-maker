import React from 'react';
import {
  Stack,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Box,
  Checkbox,
  IconButton,
} from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

const STATUS_OPTIONS = ['Products', 'Popular'];

export default function Filter() {
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [age1, setAge1] = React.useState(10);

  const handleChange1 = (event) => {
    setAge1(event.target.value);
  };
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      spacing={1}
      mt={2}>
      <Stack
        direction='row'
        alignItems='center'
        spacing={2}>
        <Box>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Select ads'
          />
        </Box>
        <FormControl
          sx={{
            '.MuiInputBase-root ': {
              textTransform: 'capitalize',
              bgcolor: 'common.white',
              borderRadius: '12px',
              minWidth: 120,
            },
            fieldset: {
              border: 'none',
            },
          }}>
          <Select
            id='demo-simple-select'
            value={age}
            onChange={handleChange}>
            <MenuItem value={10}>Product</MenuItem>
            <MenuItem value={20}>Product 2</MenuItem>
            <MenuItem value={30}>Product 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            '.MuiInputBase-root ': {
              textTransform: 'capitalize',
              bgcolor: 'common.white',
              borderRadius: '12px',
              minWidth: 120,
            },
            fieldset: {
              border: 'none',
            },
          }}>
          <Select
            id='demo-simple-select'
            value={age1}
            onChange={handleChange1}>
            <MenuItem value={10}>Sort: by popular</MenuItem>
            <MenuItem value={20}>Sort: by Products</MenuItem>
            <MenuItem value={30}>Sort: by Product</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <IconButton
        size='large'
        sx={{
          borderRadius: '12px !important',
          bgcolor: 'common.white',
        }}>
        <GridViewOutlinedIcon />
      </IconButton>
    </Stack>
  );
}

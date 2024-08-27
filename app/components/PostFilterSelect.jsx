import React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PostFilterSelect = ({ showDeleted, handleShowDeletedChange }) => {
  const theme = useTheme();

  return (
    <FormControl
      sx={{
        width: '23.5%',
        '& .MuiInputBase-input': { color: 'black' }, // Text color
        '& .MuiInputLabel-root': { color: 'black' }, // Label color
        '& .MuiOutlinedInput-root': {
          border: '1px solid black', // Border with color
          borderRadius: '25px', // Border radius
        },
        '& .MuiSvgIcon-root': { color: 'black' }, // Calendar icon color
        '& .MuiInputBase-root': {
          backgroundColor: 'white', // Background color for the input
        },
      }}
    >

      <Select
        id="post-filter-select"
        value={showDeleted}
        onChange={handleShowDeletedChange}
        input={<OutlinedInput label="Filter Posts" />}
        MenuProps={MenuProps}
      >
        <MenuItem value="hide" style={("hide", showDeleted, theme)}>
          <em>All Posts</em>
        </MenuItem>
        <MenuItem value="show" style={("show", showDeleted, theme)}>
          <em>Deleted Posts</em>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default PostFilterSelect;

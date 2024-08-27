import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, TextField } from '@mui/material';
import ClearFiltersButton from './ClearFiltersButton'; 

export default function DatePicker({ startDate, setStartDate, endDate, setEndDate }) {

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleClearFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <MUIDatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '101.7%',
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
                />
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} container alignItems="center">
          <Grid item xs={9}>
            <MUIDatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    sx={{
                      width: '134%',
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
                  />
                ),
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <ClearFiltersButton onClick={handleClearFilters} />
          </Grid>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
